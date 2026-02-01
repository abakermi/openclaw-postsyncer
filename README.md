# PostSyncer Skill for OpenClaw

This skill allows you to manage your [PostSyncer](https://postsyncer.com) account directly from OpenClaw (or any CLI).

## Features

- List Workspaces
- List Posts
- Create Posts (CLI wrapper)

## Installation

```bash
npm install
npm run build
npm link
```

## Configuration

Set your API key in `.env` or export it:

```bash
export POSTSYNCER_API_KEY="your_key"
```

## Usage

```bash
postsyncer --help
```
