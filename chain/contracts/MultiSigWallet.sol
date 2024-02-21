// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract MultiSigWallet {
    // 多签成员
    address[] public owners;
    mapping(address => bool) isOwner;
    uint256 public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }
    // 全部交易数据
    Transaction[] public transactions;

    mapping(uint => mapping(address => bool)) public isConfirmed;

    // 存钱 记录
    event Deposit(address indexed sender, uint256, uint256 balance);
    // 确认交易 记录
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    // 驳回交易 记录
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    // 执行交易 记录
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);
    event SubmitTransaction(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        bytes data
    );

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not Owner");
        _;
    }
    modifier txExists(uint256 _txIndex) {
        require(_txIndex < transactions.length, "Transction not exist");
        _;
    }
    modifier notExecuted(uint256 txIndex) {
        require(!transactions[txIndex].executed, "Tranction not executed");
        _;
    }
    modifier notConfirmed(uint256 txIndex) {
        require(isConfirmed[txIndex][msg.sender], "Transction not confirmed");
        _;
    }

    // 初始化设置签名者和验证者的数量
    constructor(address[] memory _owners, uint256 _numConfirmationsRequired) {
        require(_owners.length > 0, "Owners required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            // 校验是否重复
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public onlyOwner {
        uint256 txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(
        uint256 _txIndex
    )
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transction = transactions[_txIndex];
        transction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(
        uint256 _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        // 校验签名数量通过
        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );

        require(success, "tx failed");
        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    // 驳回交易
    function revokeTransction(
        uint256 _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransctionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransction(
        uint256 _txIndex
    ) public view returns (Transaction memory) {
        return transactions[_txIndex];
    }
}
