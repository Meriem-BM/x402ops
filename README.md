# SpendMate (x402Ops) - Policy-Enabled AI Agent Orchestration

SpendMate (x402Ops) is a modern control panel for managing, monitoring, and orchestrating autonomous AI agents with advanced on-chain capabilities. Built on the **Coinbase Developer Platform (CDP)** and **AgentKit**, it leverages **x402 Protocol** for policy enforcement, enabling secure and regulated agent behavior on-chain.

Designed for accessibility, x402Ops empowers **non-technical users** to create and deploy sophisticated AI agents with native payment capabilities—no coding required.

---

### Links

- **Live Demo**: [x402ops.vercel.app](https://x402ops.vercel.app)
- **Pitch Deck**: [Canva Presentation](https://canva.com/...)
- **Video Demo**: [YouTube/Loom Link](https://youtube.com/...)

---

## Key Capabilities

### No-Code Agent Creation

Launch autonomous AI agents with payment capabilities in seconds. The intuitive interface abstracts away complex blockchain and wallet setup, allowing anyone to deploy agents that can:

- Execute on-chain transactions
- Perform token transfers
- Interact with decentralized protocols
- Maintain persistent memory and identity

### x402 Policy Enforcement

Agents are not just autonomous; they are compliant. x402Ops integrates the **x402 Protocol** to enforce granular policies:

- **Daily Spending Limits**: Restrict the amount of ETH/USDC an agent can spend per day.
- **Transaction Caps**: Set maximum values for individual transactions.
- **Allowed Vendors**: Whitelist specific contracts or addresses that agents can interact with.
- **Real-time Policy Checks**: Transactions are validated against these policies before execution.

### CDP MPC Wallets

Each agent is provisioned with a dedicated **Coinbase MPC Wallet**, ensuring:

- **Non-custodial security**: Private keys are never fully exposed.
- **Programmable control**: Wallets are tightly coupled with agent logic and x402 policies.
- **Seamless Funding**: Integrated testnet faucet access for quick agent bootstrapping.

### Operations Dashboard

A unified interface to oversee your agent fleet:

- **Live Activity Feed**: Monitor agent thoughts, actions, and transaction statuses.
- **Financial Overview**: Track balances, spending history, and policy utilization.
- **Direct Interaction**: Chat interface to give instructions or debug specific agents.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Radix-UI
- **Database**: Postgres (Neon), Drizzle ORM
- **AI & Agents**:
  - Coinbase AgentKit
  - LangChain
  - OpenAI GPT-4o
- **Blockchain & Security**:
  - **x402 Protocol** (Policy Engine)
  - Coinbase Developer Platform (CDP) SDK
  - Viem / Wagmi
  - Base Sepolia Testnet
- **Authentication**: Privy

## Getting Started

### Prerequisites

- Node.js 22+
- Yarn 4.0.0
- PostgreSQL database (e.g., Neon)
- Coinbase Developer Platform API Credentials
- OpenAI API Key

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/x402ops.git
    cd x402ops
    ```

2.  Install dependencies:

    ```bash
    yarn install
    ```

3.  Set up environment variables:
    Create a `.env` file based on `.env.example` and add your credentials:

    ```env
    DATABASE_URL=your_postgres_url
    CDP_API_KEY_ID=your_cdp_key_id
    CDP_API_KEY_SECRET=your_cdp_key_secret
    CDP_WALLET_SECRET=your_cdp_wallet_secret
    OPENAI_API_KEY=your_openai_key
    NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
    ```

4.  Push the database schema:

    ```bash
    yarn db:push
    ```

5.  Run the development server:

    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

- **Agent Isolation**: Agents are independent entities persisted in the database. Conversation history and memory are isolated using unique thread IDs corresponding to their specific wallet addresses.
- **Policy Layer**: The `x402ActionProvider` acts as middleware, intercepting agent actions to verify compliance with defined policies before signing transactions via CDP.
- **Wallet Management**: Credentials and seed data are encrypted and stored securely, allowing agents to be re-instantiated with their specific wallet state across sessions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
