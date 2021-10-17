const { assert } = require('chai');

const OurStorageDapp = artifacts.require("OurStorageDapp");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Our Social Media', ([account1, account2, account3]) => {
    let ourStorageDapp;
    before(async () => {
        ourStorageDapp = await OurStorageDapp.deployed();
    })

    describe('test deployment', async () => {
        it('deploys successfully', async () => {
            const address = await ourStorageDapp.address;
            const contractName = await ourStorageDapp.contractName();

            assert.equal(contractName, "Our Decentralized Storage (ODS)");
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('uploading and getting file', async () => {
        let result, fileCount
        const fileHash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
        const fileSize = '1'
        const fileType = 'TypeOfTheFile'
        const fileName = 'NameOfTheFile'
        const fileDescription = 'DescriptionOfTheFile'

        it('uploading file succefully', async () => {
            const totalFileCount0 = await ourStorageDapp.getTotalFileCount({ from: account1 });
            assert.equal(totalFileCount0, 0);

            await ourStorageDapp.uploadFile(fileHash, fileSize, fileType, fileName, fileDescription, { from: account1 });

            const totalFileCount = await ourStorageDapp.getTotalFileCount({ from: account1 });
            assert.equal(totalFileCount, 1);

            await ourStorageDapp.uploadFile('', fileSize, fileType, fileName, fileDescription, { from: account1 }).should.be.rejected;
            await ourStorageDapp.uploadFile(fileHash, '', fileType, fileName, fileDescription, { from: account1 }).should.be.rejected;
            await ourStorageDapp.uploadFile(fileHash, fileSize, '', fileName, fileDescription, { from: account1 }).should.be.rejected;
            await ourStorageDapp.uploadFile(fileHash, fileSize, fileType, '', fileDescription, { from: account1 }).should.be.rejected;
            await ourStorageDapp.uploadFile(fileHash, fileSize, fileType, fileName, '', { from: account1 }).should.be.rejected;

        })

        it('geting uploaded file succefully', async () => {
            const file = await ourStorageDapp.getFileOf(1);
            assert.equal(file.fileId, 1, 'id is correct')
            assert.equal(file.fileHash, fileHash, 'Hash is correct')
            assert.equal(file.fileSize, fileSize, 'Size is correct')
            assert.equal(file.fileType, fileType, 'type is correct')
            assert.equal(file.fileName, fileName, 'Size is correct')
            assert.equal(file.fileDes, fileDescription, 'description is correct')
            assert.equal(file.uploader, account1, 'uploader is correct')
        })


    })

    describe('editing file', async () => {
        const fileHash1 = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
        const fileSize1 = '1'
        const fileType1 = 'TypeOfTheFile'
        const newName = 'newNameForChecking this'
        const newDes = 'new Des for checking'

        it('editing file succefully', async () => {
            await ourStorageDapp.editFileDeatils(1, newName, newDes, { from: account1 });
        })
        it('cheking edited file succefully', async () => {
            const editedFile = await ourStorageDapp.getFileOf(1);

            assert.equal(editedFile.fileId, 1, 'id is correct')
            assert.equal(editedFile.fileHash, fileHash1, 'Hash is correct')
            assert.equal(editedFile.fileSize, fileSize1, 'Size is correct')
            assert.equal(editedFile.fileType, fileType1, 'type is correct')
            assert.equal(editedFile.fileName, newName, 'Size is correct')
            assert.equal(editedFile.fileDes, newDes, 'description is correct')
            assert.equal(editedFile.uploader, account1, 'uploader is correct')

        })
    })


    describe('deleting file', async () => {
        const deleteName = '0deleted_'
        const deleteNameForever = '0deleted_forever_'

        it('deleting file succefully', async () => {
            await ourStorageDapp.deleteFile(1);
        })

        it('cheking delete file succefully', async () => {
            const editedFile = await ourStorageDapp.getFileOf(1);

            assert.equal(editedFile.fileId, 1, 'id is correct')
            assert.equal(editedFile.fileName, deleteName, 'Size is correct')

        })

        it('deleting file forever succefully', async () => {
            await ourStorageDapp.deleteFileForever(1);
        })

        it('cheking delete file forever succefully', async () => {
            const editedFile = await ourStorageDapp.getFileOf(1);

            assert.equal(editedFile.fileId, 1, 'id is correct')
            assert.equal(editedFile.fileHash, '', 'Hash is correct')
            assert.equal(editedFile.fileName, deleteNameForever, 'Size is correct')
            assert.equal(editedFile.fileDes, '', 'description is correct')
        })
    })
})