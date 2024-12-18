# AppIcon Forge

An intuitive app icon generator that lets you customize colors, borders, gradient, shadows, text, local images and more to create unique app icons effortlessly.

## Example

![example1](./screenshots/1-1.png)
![example2](./screenshots/1-2.png)
![example3](./screenshots/1-3.png)
![example4](./screenshots/1-4.png)

## Features

- Customize icon size, position, color, background color, border, gradient, and shadow
- Customize text content and text gradient
- Customize local SVG files or images
- Generate icons using [Iconify Icons](https://iconify.design/) with over 200,000 available icons.
- Real-time preview of your icon changes.
- Easy export of icons for apps.

> [!IMPORTANT]
> The text icons use the system's default fonts, and copyright compliance cannot be guaranteed. Please proceed with caution when making your selection.

## Usage

You can use AppIcon Forge directly from GitHub Pages without any installation. Simply visit the following URL:

[AppIcon Forge on GitHub Pages](https://zhangyu1818.github.io/appicon-forge/)

If you want to run it locally:

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/zhangyu1818/appicon-forge.git

# Navigate to the directory
cd appicon-forge

# Install dependencies
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Visit `http://localhost:5173/appicon-forge/` in your browser to start using AppIcon Forge.

## Deployment

To build the project for production:

```sh
pnpm build
```

Deploy the contents of the `out` folder to your web server or GitHub Pages.

## License

This project is licensed under the MIT License.
