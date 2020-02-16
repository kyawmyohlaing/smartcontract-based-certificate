pragma solidity ^0.4.19;

contract CertificateRegistry {
    address [] public registeredCertificate;
    event ContractCreated(address contractAddress);

    function createCertificate(string _firstName, string _middleName, string _lastName, string _certificateId, string _issueDate, uint _date ) public {
        address newCertificate = new Certificate(msg.sender, _firstName, _middleName, _lastName, _certificateId, _issueDate, _date);
        emit ContractCreated(newCertificate);
        registeredCertificate.push(newCertificate);
    }

    function getDeployedCertificates() public view returns (address[]) {
        return registeredCertificate;
    }
}

/**
 * @title Certificate
 * @dev The Certificate contract provides basic storage for names and certificateId, and has a simple function
 * that lets people ring a bell to celebrate the CertificateRegistry
 */
contract Certificate {

     event RewardBells(address ringer, uint256 count);

    // Owner address
    address public owner;

    /// Certificate Feature
    string public firstName;
    string public middleName;
    string public lastName;
    string public certificateId;
    string public issueDate;
    // date public certificateDate;
    uint public certificateDate;
    
    // Bell counter
    uint256 public bellCounter;

 /**
    * @dev Throws if called by any account other than the owner
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    * @dev Constructor sets the original `owner` of the contract to the sender account, and
    * commits the certificate details and vows to the blockchain
    */
   
    constructor(address _owner, string _firstName, string _middleName, string _lastName, string _certificateId, string _issueDate, uint _date) public {
        // TODO: Assert statements for year, month, day
        owner = _owner;
        firstName = _firstName;
        middleName = _middleName;
        lastName = _lastName;
        certificateId = _certificateId;
        issueDate = _issueDate;
       certificateDate = _date;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) private pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }

/**
    * @dev ringBell is a payable function that allows people to reward the Certificate, and
    * also send Ether to the Certificate contract
    */
    function ringBell() public payable {
        bellCounter = add(1, bellCounter);
        emit RewardBells(msg.sender, bellCounter);
    }

    /**
    * @dev withdraw allows the owner of the contract to withdraw all ether collected by bell ringers
    */
    function collect() external onlyOwner {
        owner.transfer(address(this).balance);
    }

    /**
    * @dev withdraw allows the owner of the contract to withdraw all ether collected by bell ringers
    */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    /**
    * @dev returns contract metadata in one function call, rather than separate .call()s
    * Not sure if this works yet
    */
   
    function getCertificateDetails() public view returns (
        address, string, string, string, string, string, uint, uint256) {
        return (
            owner,
            firstName,
            middleName,
            lastName,
            certificateId,
            issueDate,
            certificateDate,
            bellCounter
        );
    }
}