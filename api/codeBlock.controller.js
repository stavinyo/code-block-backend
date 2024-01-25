import { codeBlockService } from './codeBlock.service.js'

//LIST
export async function getCodeBlocks(req, res) {
    console.log('test getCodeBlocks')

    try {
        const codeBlocks = await codeBlockService.query()
        res.json(codeBlocks)
    } catch (err) {
        console.error('Failed to get codeBlocks', err)
        res.status(500).send({ err: 'Failed to get codeBlocks' })
    }
}

export async function updateCodeBlock(req, res) {
    console.log('test updateCodeBlock!!!')

    try {
        const codeBlock = req.body
        const updatedCodeBlock = await codeBlockService.update(codeBlock)
        res.json(updatedCodeBlock)
    } catch (err) {
        console.error('Failed to update codeBlock', err)
        res.status(500).send({ err: 'Failed to update codeBlock' })
    }
}

export async function getCodeBlockById(req, res) {
    console.log("banana")
    try {
        const codeBlockId = req.params.id
        const codeBlock = await codeBlockService.getById(codeBlockId)
        res.json(codeBlock)
    } catch (err) {
        console.error('Failed to get codeBlock', err)
        res.status(500).send({ err: 'Failed to get codeBlock' })
    }
}

export async function addCodeBlock(req, res) {
    try {
        const codeBlock = req.body
        const addedCodeBlock = await codeBlockService.add(codeBlock)
        res.json(addedCodeBlock)
    } catch (err) {
        console.error('Failed to add codeBlock', err)
        res.status(500).send({ err: 'Failed to add codeBlock' })
    }
}

export async function removeCodeBlock(req, res) {
    try {
        const codeBlockId = req.params.id
        await codeBlockService.remove(codeBlockId)
        res.send()
    } catch (err) {
        console.error('Failed to remove codeBlock', err)
        res.status(500).send({ err: 'Failed to remove codeBlock' })
    }
}