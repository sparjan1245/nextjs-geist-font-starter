```markdown
# Detailed Implementation Plan for React Native Movie Streaming App

This plan outlines the creation of a Netflix-style mobile streaming app using Expo with sample movie data and modern UI elements. The app includes user authentication screens (UI only), a home screen with featured and trending movie sections, detailed movie pages, a video player screen, a watchlist, and a profile screen. All components follow best practices, error handling, and modern design principles (using typography, spacing, and colors).

---

## 1. Project Setup

- **Initialize a New Expo Project:**  
  Run:  
  ```
  expo init MovieStreamApp --template expo-template-blank-typescript
  ```  
  This creates the core files: `App.tsx`, `app.json`, `package.json`, and `babel.config.js`.

- **Install Required Dependencies:**  
  Add packages:  
  ```
  expo install expo-av
  npm install @react-navigation/native @react-navigation/native-stack react-native-safe-area-context
  ```  
  (Optionally add AsyncStorage if local persistence is required.)

---

## 2. Directory Structure & Dependent Files

### Root Files
- **package.json:** Update with new dependencies.
- **App.tsx:** Main entry point.
- **app.json & babel.config.js:** Expo and Babel configuration files.

### `/src` Directory
- **/screens:**  
  - **LoginScreen.tsx:** Login form with email/password inputs and navigation links.
  - **SignupScreen.tsx:** Signup form with email, password, and confirm password.
  - **ForgotPasswordScreen.tsx:** Form for email input with a reset action.
  - **HomeScreen.tsx:** Displays a search bar, featured carousel, trending movies section, and category filters (Action, Drama, Comedy).
  - **MovieDetailsScreen.tsx:** Shows movie poster, title, description, cast, release date, rating, and buttons to play video or add to watchlist.
  - **VideoPlayerScreen.tsx:** Renders a video using Expo’s Video component with play, pause, and full-screen controls, and error handling.
  - **WatchlistScreen.tsx:** Lists favorited movies from local state.
  - **ProfileScreen.tsx:** Editable form for user profile details.

- **/components:**  
  - **MovieCard.tsx:** Displays a movie’s poster, title, and rating. Uses an `<Image>` with an `onError` fallback.
  - **Carousel.tsx:** Implements a horizontal ScrollView for featured movies using MovieCard.
  - **CustomButton.tsx:** A modern styled button (using TouchableOpacity) with template literals for styling.
  - **InputField.tsx:** A reusable text input component with error display and modern UI styling.
  - **Header.tsx (optional):** A consistent header component for screens if needed.

- **/navigation:**  
  - **AppNavigator.tsx:** Configures navigation using a native stack.  
    - Setup two stacks: an `AuthStack` (Login, Signup, ForgotPassword) and a `MainStack` (Home, MovieDetails, VideoPlayer, Watchlist, Profile).

- **/context:**  
  - **AuthContext.tsx:** Manages authentication state (user info, login status) with error handling.
  - **MovieContext.tsx:** Maintains watchlist/favorites state and provides functions to add/remove movies.

- **/data:**  
  - **sampleMovies.json:** Contains an array of movie objects. Example:
    ```json
    [
      {
        "id": 1,
        "title": "Sample Movie 1",
        "category": "Action",
        "poster": "https://placehold.co/400x600?text=Inspired+action+movie+poster",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "description": "This is a sample movie description.",
        "cast": ["Actor 1", "Actor 2"],
        "rating": 4.5,
        "releaseDate": "2023-01-01"
      }
    ]
    ```

- **/styles:**  
  - **globalStyles.ts, colors.ts, fonts.ts:** Define a dark background, red accents, white typography, and consistent spacing.

---

## 3. Step-by-Step File Modifications

### App.tsx
- Wrap the app in `<NavigationContainer>` and include both `AuthContext` and `MovieContext` providers.
- Import `AppNavigator` from `/src/navigation/AppNavigator.tsx`.
- Implement an error boundary for unexpected navigation failures.

### package.json
- Ensure dependencies include Expo, Expo-AV, React Navigation, and necessary TypeScript types.
- Update scripts as needed.

### /src/navigation/AppNavigator.tsx
- Use `createNativeStackNavigator` to create two stacks:  
  - **AuthStack:** Define routes for Login, Signup, and ForgotPassword screens.  
  - **MainStack:** Define routes for Home, MovieDetails, VideoPlayer, Watchlist, and Profile screens.
- Configure navigation options for a modern, minimal header design.

### /src/screens/LoginScreen.tsx, SignupScreen.tsx & ForgotPasswordScreen.tsx
- Build forms with `InputField` components and `CustomButton`.
- Implement basic validation (e.g., non-empty fields).
- Add navigation links between screens.
- Display inline error messages on validation failure.

### /src/screens/HomeScreen.tsx
- Import sample movie data from `/src/data/sampleMovies.json`.
- Render a modern search bar at the top using `InputField`.
- Implement a `Carousel` for featured movies and a vertical list/grid for trending movies using `MovieCard`.
- Use modern spacing, clear typography, and subtle animations for UI interactivity.

### /src/screens/MovieDetailsScreen.tsx
- Accept a movie identifier via navigation parameters.
- Render the movie poster using an `<Image>` with a fallback error handler:
  ```typescript
  <Image
    source={{ uri: "https://placehold.co/400x600?text=Sample+Movie+Poster+with+modern+layout" }}
    alt="Sample movie poster with modern layout and high-resolution quality"
    onError={({ nativeEvent }) => console.error("Image failed to load", nativeEvent)}
    style={styles.poster}
  />
  ```
- Display movie details: title, description, cast, release date, and rating.
- Include a “Play” button (navigates to VideoPlayerScreen with `videoUrl`) and an “Add to Watchlist” button (updates MovieContext).

### /src/screens/VideoPlayerScreen.tsx
- Utilize Expo’s `Video` component to play the sample video.
- Provide UI controls for play, pause, and full screen with a dark-themed overlay.
- Handle errors via the `onError` prop and display a user-friendly error message.

### /src/screens/WatchlistScreen.tsx
- Fetch the list of favorited movies from MovieContext.
- Render each using `MovieCard` and allow removals via context functions.

### /src/screens/ProfileScreen.tsx
- Create a modern form to edit profile details (name, email) with `InputField` components.
- Use local state and context to simulate data persistence.
- Validate changes and provide inline error messages.

### /src/components/MovieCard.tsx
- Build a component that displays the movie poster, title, and rating.
- Use an `<Image>` tag with an `onError` handler to reliably handle broken image URLs.
- Implement a press handler to navigate to MovieDetailsScreen.

### /src/components/Carousel.tsx
- Create a horizontal `ScrollView` that renders a list of `MovieCard` components.
- Ensure smooth scrolling and proper spacing between cards.

### /src/components/CustomButton.tsx
- Develop a reusable button component with TouchableOpacity.
- Apply modern styles (using template literals for styling strings) and support disabled states.
- Validate the presence of an `onPress` callback.

### /src/components/InputField.tsx
- Build a custom text input that displays validation errors in a minimalist style.
- Include styling for focus states and error borders.

### /src/context/AuthContext.tsx & /src/context/MovieContext.tsx
- Set up React Contexts to manage authentication and watchlist states.
- Provide functions for logging in/out, adding/removing favorite movies.
- Include error handling for state updates and asynchronous actions.

### /src/data/sampleMovies.json
- Populate with the provided movie data.
- Ensure robust data structure for all screens to use consistently.

### /src/styles/globalStyles.ts, colors.ts, fonts.ts
- Define and export a dark theme with red accents, clean typography, and consistent margins/paddings.
- Use these constants across all components for uniform UI.

---

## 4. Error Handling & Best Practices

- **Form Validation:** Ensure all input fields in authentication and profile screens check for empty or invalid data.
- **Image/Video Fallbacks:** Attach onError handlers to `<Image>` and `<Video>` components to show fallback UI messages.
- **Context Safety:** Wrap context provider functions with try/catch blocks.
- **Navigation Robustness:** Include error boundaries in navigation components.
- **Modern UI:** Use modern typography, ample spacing, and a dark-themed color palette without external icon packs.

---

## 5. Testing & Verification

- **Run the App:** Use `expo start` to launch on a simulator/device.
- **Test Flows:** Verify navigation across authentication, home, details, video playback, watchlist, and profile screens.
- **Video Playback:** Use curl or logging to check video component events for play/pause and error responses.
- **Manual Testing:** Validate form inputs and error messages across screens.

---

# Summary

- Initialized a new Expo project with a TypeScript structure and required dependencies.  
- Configured React Navigation to manage authentication and main app flows (Home, Details, Video, Watchlist, Profile).  
- Developed modern, self-contained UI components (MovieCard, Carousel, CustomButton, InputField) with error handling and fallback mechanisms.  
- Integrated React Context for managing user and watchlist state with robust error handling.  
- Loaded sample movie data from a JSON file and rendered it dynamically in the Home and Movie Details screens.  
- Video playback uses Expo’s Video component with a dark-themed, minimalist control overlay.  
- All screens and components follow best practices in error handling, styling, and state management for a realistic movie streaming experience.
