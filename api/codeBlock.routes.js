import express from 'express';
import { getCodeBlocks, getCodeBlockById, updateCodeBlock } from './codeBlock.controller.js';

export const codeBlockRoutes = express.Router();

codeBlockRoutes.get('/', getCodeBlocks);
codeBlockRoutes.get('/:id', getCodeBlockById);
codeBlockRoutes.put('/:id', updateCodeBlock);


