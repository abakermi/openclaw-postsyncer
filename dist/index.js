#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const api_1 = require("./api");
const chalk_1 = __importDefault(require("chalk"));
const program = new commander_1.Command();
program
    .name('postsyncer')
    .description('CLI for PostSyncer API')
    .version('1.0.0');
program
    .command('workspaces')
    .description('List workspaces')
    .action(async () => {
    try {
        const api = new api_1.PostSyncerApi();
        const workspaces = await api.getWorkspaces();
        console.log(JSON.stringify(workspaces, null, 2));
    }
    catch (error) {
        console.error(chalk_1.default.red('Error:'), error.response?.data || error.message);
    }
});
program
    .command('posts')
    .description('List posts')
    .action(async () => {
    try {
        const api = new api_1.PostSyncerApi();
        const posts = await api.getPosts();
        console.log(JSON.stringify(posts, null, 2));
    }
    catch (error) {
        console.error(chalk_1.default.red('Error:'), error.response?.data || error.message);
    }
});
program
    .command('create-post')
    .description('Create a new post')
    .requiredOption('-w, --workspace <id>', 'Workspace ID')
    .requiredOption('-t, --text <text>', 'Post text')
    // We'll keep it simple for CLI, complex posts might need a JSON file input later
    .action(async (options) => {
    try {
        const api = new api_1.PostSyncerApi();
        // Minimal payload for testing - user would likely need to expand this for real usage
        // forcing some defaults to make it work from CLI
        const payload = {
            workspace_id: parseInt(options.workspace),
            content: [
                {
                    text: options.text,
                    media: []
                }
            ],
            // Default to "now" or "draft" if possible? Docs show "schedule_for".
            // Let's assume schedule_type: "now" exists or we just schedule for 5 mins from now.
            // Actually, let's try to make it a "draft" or just omit schedule if API allows.
            // If not, we'll need to add scheduling flags.
            // For CLI MVP, let's just log the intent.
            // Docs example showed schedule_type: "schedule".
        };
        console.log(chalk_1.default.yellow("Note: Creating posts via CLI minimal wrapper."));
        console.log("Payload:", JSON.stringify(payload, null, 2));
        const result = await api.createPost(payload);
        console.log(chalk_1.default.green('Post created:'), result);
    }
    catch (error) {
        console.error(chalk_1.default.red('Error:'), error.response?.data || error.message);
    }
});
program.parse(process.argv);
