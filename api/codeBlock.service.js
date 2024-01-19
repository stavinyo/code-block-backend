import fs from 'fs'
import { utilService } from '../services/util.service.js'

const codeBlocks = utilService.readJsonFile('data/codeBlock.json')

async function query() {
    try {
        const codeBlocks = await utilService.readJsonFile('data/codeBlock.json');
        return codeBlocks;
    } catch (err) {
        console.error('Error reading JSON file:', err);
        throw err;
    }
}

async function getById(codeBlockId) {
    try {
        const codeBlock = codeBlocks.find(codeBlock => codeBlock._id === codeBlockId)
        return codeBlock
    } catch (err) {
        console.error(`Cannot find codeBlock by this ID ${codeBlockId}`, err)
        throw err
    }
}


const FILE_PATH = 'data/codeBlock.json'

async function update(codeBlock) {
    console.log('Updating code block:', codeBlock)
    try {
        const idx = codeBlocks.findIndex(blockUpdate => blockUpdate._id === codeBlock._id)

        if (idx !== -1) {
            codeBlocks[idx] = { ...codeBlock };
            utilService.writeJsonFile(FILE_PATH, codeBlocks)
            return codeBlocks[idx];
        } else {
            console.error(`Code block with ID ${codeBlock._id} not found`)
            throw new Error(`Code block with ID ${codeBlock._id} not found`)
        }
    } catch (err) {
        console.error(`Cannot update codeBlock ${codeBlock._id}`, err)
        throw err
    }
}

export const codeBlockService = {
    query,
    getById,
    update,
}