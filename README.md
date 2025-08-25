# Order Manager

A Vue 3 application for managing orders, built with modern web technologies.

## Features

- **Dashboard**: Overview of orders with key metrics
- **Order List**: View all orders in a sortable and filterable table
- **Order Details**: Detailed view of individual orders
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Built-in support for dark mode

## Technologies Used

- Vue 3 (Composition API)
- Vue Router
- Tailwind CSS
- Heroicons
- Lucide Icons
- Vite
- Axios

## Prerequisites

- Node.js 16+ and npm 8+

## Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/order-manager.git
   cd order-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL=https://api.mercadoe.space
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint and fix files

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable components
│   ├── common/       # Common UI components
│   └── order/        # Order-related components
├── composables/      # Composable functions
├── router/           # Vue Router configuration
├── services/         # API services
├── stores/           # Pinia stores
├── utils/            # Utility functions
└── views/            # Page components
```

## API Integration

The application fetches order data from the Mercado Eletrônico API. The base URL can be configured in the `.env` file.

## Deployment

### Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` and follow the prompts

### Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify deploy`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
