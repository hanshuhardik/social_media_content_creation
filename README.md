# Social Media Post and Blog Generator

Social Media Post Generator is an AI-powered tool that helps you create engaging and platform-optimized social media content. With support for multiple platforms and customization options, it streamlines your social media content creation process.

Built with Next.js and cutting-edge AI technology, this open-source template enables developers to create an AI-powered social media content generator. As the demand for a consistent and engaging social media presence grows, this tool provides everything you need to maintain an active and professional social media presence.

##preview
https://social-media-content-creation.vercel.app/
## Features

- Multi-platform support (Twitter/X, LinkedIn, Facebook, Instagram)
- Customizable tone of voice (Professional, Casual, Friendly, Humorous, Formal)
- Platform-specific optimizations (e.g., thread creation for Twitter, word limits for LinkedIn)
- Optional hashtag and emoji integration
- Multiple post variations from a single prompt
- Modern, responsive UI with a beautiful gradient design
- Copy-to-clipboard functionality for easy posting

## Technologies Used
- Next.js 13+ with App Router
- React for Frontend
- gemini API for AI-Powered Content Generation
- Tailwind CSS for Styling

## Use Cases
- Creating consistent social media content across multiple platforms
- Generating professional marketing posts for your business
- Maintaining an active social media presence with varied content

## Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your_userName/social_media_content_creation.git
    ```

2. Navigate to the project directory:
    ```bash
    cd social-media-post-generator
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:
    ```bash
    GEMINI_API_KEY=your_gemini_api_key
    ```
   
5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000`

## How to Use the Application

1. Enter your post topic or description in the text area or you can also upload the image
2. Select your target social media platform
3. Choose your preferred tone of voice
4. Configure additional options:
   - Word limit (for LinkedIn)
   - - Word limit for blog (1000 words to 2500 words)
   - Thread creation (for Twitter)
   - Hashtags and emojis
5. Click "Generate Posts" and wait for your AI-generated content
6. Click on "Generate Posts" again to generate the different content
7. Use the copy button to easily copy posts to your clipboard


