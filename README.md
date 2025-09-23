# LAB-1544 - Build on Webex with Cisco AI Assistant

A session for developers to learn how to build Webex bots using AI assistance.

## Overview

This interactive wizard guides developers through building a complete Webex bot step by step, with AI-generated code snippets and hands-on testing opportunities.

## Features

- **7-Step Wizard Interface**: Progressive learning experience
- **Dark/Light Theme**: Customizable UI with Cisco color palette
- **Interactive Components**: Copyable prompts, step tracking, and progress indicators
- **Real Bot Development**: Actual Webex API integration with your credentials
- **Incremental Learning**: Build features one at a time with testing in between

## Wizard Steps

1. **Welcome**: Introduction to the lab and what you'll build
2. **Login**: Simulated developer portal authentication
3. **Create Bot**: Bot creation interface with configuration
4. **Credentials**: Secure storage of bot token, email, and name
5. **Coding**: Five incremental coding steps with copyable prompts
6. **Final Code**: Complete consolidated implementation
7. **Thank You**: Completion celebration and next steps

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom Cisco color palette
- **Icons**: Lucide React
- **State Management**: React Context
- **Development**: Yarn package manager

## Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Start development server**:
   ```bash
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Color Palette

### Primary Colors
- Black: `#000000`
- White: `#FFFFFF`

### Secondary Colors
- Eucalyptus: `#008F5C`
- Ultramine: `#0672EF`

### Accent Colors
- Fountain Blue: `#00BCF5`
- Mantis: `#82CF5F`
- Passion Fruit: `#fbbd23`
- Mandarin: `#ff7a3f`
- Scarlet: `#FF3A65`
- Purple Heart: `#6B32CA`
- Velvet Grey: `#767676`

## Bot Features Built

The wizard teaches you to build a Webex bot with:

- **Echo Commands**: Respond to "Echo {message}" with "You said: {message}"
- **Math Evaluation**: Evaluate mathematical expressions using `eval()`
- **Message Filtering**: Ignore messages from the bot itself
- **Name Recognition**: Remove bot name from messages before processing
- **Webhook Management**: Handle webhook creation conflicts gracefully

## Development

- **Linting**: `yarn lint`
- **Build**: `yarn build`
- **Production**: `yarn start`

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── steps/          # Individual wizard step components
│   ├── CopyablePrompt.tsx
│   ├── StepIndicator.tsx
│   ├── ThemeToggle.tsx
│   └── WizardLayout.tsx
├── contexts/           # React context providers
│   ├── ThemeContext.tsx
│   └── WizardContext.tsx
├── globals.css         # Global styles and Tailwind utilities
├── layout.tsx         # Root layout
└── page.tsx           # Main application entry
```

## License

This project is designed for educational purposes as part of Cisco's AI Assistant development lab sessions.
