# My Favorite Location - React Native App

A comprehensive React Native application that allows users to save and manage their favorite locations with images, coordinates, and detailed information. This project demonstrates modern React Native development practices including state management, navigation, location services, image handling, and Google Maps integration.

## 📱 App Overview

**My Favorite Location** is a location-based mobile application built with React Native and Expo. Users can:
- 📍 Pick locations using Google Maps integration
- 📸 Take photos or select images for each location
- 💾 Save favorite places with detailed information
- 🗺️ View saved locations on an interactive map
- 📋 Browse and manage their saved places
- 🔍 Get detailed information about each saved location

## 🛠️ Technologies & Libraries Used

### Core Framework
- **React Native** (v0.79.5) - Cross-platform mobile development framework
- **Expo** (v53.0.20) - Development platform and toolchain for React Native
- **React** (v19.0.0) - JavaScript library for building user interfaces

### Navigation
- **@react-navigation/native** (v7.1.16) - Navigation library for React Native
- **@react-navigation/native-stack** (v7.3.23) - Stack navigator for screen transitions
- **react-native-screens** (v4.11.1) - Native navigation primitives
- **react-native-safe-area-context** (v5.4.0) - Safe area handling for different devices

### State Management
- **@reduxjs/toolkit** (v2.8.2) - Modern Redux toolkit for state management
- **react-redux** (v9.2.0) - React bindings for Redux

### UI Components & Styling
- **react-native-paper** (v5.14.5) - Material Design components for React Native
- **@react-native-vector-icons/material-design-icons** (v12.2.0) - Material Design icons

### Location & Maps
- **react-native-maps** (v1.20.1) - React Native Maps component
- **expo-location** (v18.1.6) - Location services for Expo apps

### Media & Camera
- **expo-camera** (v16.1.11) - Camera functionality
- **expo-image-picker** (v16.1.4) - Image selection and camera access

### Database & Storage
- **expo-sqlite** (v15.2.14) - SQLite database for local data storage

### Utilities
- **expo-status-bar** (v2.2.3) - Status bar management
- **expo-app-loading** (v2.1.1) - App loading screen

## 📁 Project Structure

```
My-Favorite-Location/
├── App.js                          # Main app component with navigation setup
├── index.js                        # Entry point for the app
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── assets/                         # Static assets (icons, images)
├── components/                     # Reusable UI components
│   ├── places/                    # Location-specific components
│   │   ├── ImagePickers.js        # Image selection component
│   │   ├── LocationPicker.js      # Location selection with maps
│   │   ├── PlaceForm.js           # Form for adding new places
│   │   ├── PlaceItem.js           # Individual place display component
│   │   └── PlacesList.js          # List of all saved places
│   └── UI/                        # Generic UI components
│       ├── FilledButton.js        # Primary action button
│       ├── IconButton.js          # Icon-only button component
│       └── OutlinedButton.js      # Secondary action button
├── Constants/
│   └── Colors.js                  # Color palette definitions
├── hooks/                         # Custom React hooks
├── models/
│   └── place.js                   # Place data model class
├── screens/                       # App screens/pages
│   ├── AllPlaces.js              # Main screen showing all saved places
│   ├── AddPlaces.js              # Screen for adding new places
│   ├── PlaceDetails.js           # Detailed view of a specific place
│   ├── Map.js                    # Interactive map screen
│   └── MapView.js                # Map view component
├── store/                        # Redux state management
│   ├── AppStore.js               # Redux store configuration
│   └── MyAppSlice.js             # Redux slice for places data
├── utils/                        # Utility functions
│   ├── database.js               # Database operations
│   └── Location.js               # Location and Google Maps utilities
├── GOOGLE_MAPS_SETUP.md          # Google Maps API setup guide
└── TROUBLESHOOTING.md            # Troubleshooting guide
```

## 🏗️ Architecture & Design Patterns

### 1. **Component-Based Architecture**
The app follows React's component-based architecture with clear separation of concerns:
- **Screens**: Main app views (AllPlaces, AddPlaces, PlaceDetails, Map)
- **Components**: Reusable UI elements (buttons, forms, lists)
- **Models**: Data structures (Place class)
- **Utils**: Helper functions and services

### 2. **State Management with Redux Toolkit**
```javascript
// Store configuration (store/AppStore.js)
export const AppStore = configureStore({
  reducer: {
    allPlaces: MyAppSlice,
  },
});

// Redux slice (store/MyAppSlice.js)
const MyAppSlice = createSlice({
  name: "allPlaces",
  initialState: {
    allPlacesList: [],
    pickedLocation: { lat: "", long: "" },
  },
  reducers: {
    addFavoritePlace: (state, action) => {
      state.allPlacesList.push(action.payload);
    },
    // ... other reducers
  },
});
```

### 3. **Navigation Structure**
The app uses React Navigation with a stack navigator:
- **allplaces**: Main screen with list of saved places
- **addplace**: Form to add new places
- **placedetails**: Detailed view of a specific place
- **mapScreen**: Interactive map view
- **mapView**: Map view component

### 4. **Data Model**
```javascript
// Place model (models/place.js)
class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = {
      lat: location.lat,
      long: location.long,
      address: location.address,
    };
    this.id = new Date().toString() + Math.random().toString();
  }
}
```

## 🎨 UI/UX Design

### Color Scheme
The app uses a carefully designed color palette defined in `Constants/Colors.js`:
- **Primary Colors**: Blue gradient from light (#cfeffd) to dark (#003b88)
- **Accent Color**: Gold (#e6b30b) for highlights
- **Neutral Colors**: Gray scale for text and backgrounds
- **White**: (#ffffff) for backgrounds and contrast

### Component Design
- **Material Design**: Uses react-native-paper for consistent Material Design components
- **Custom Components**: Reusable UI components for buttons, forms, and lists
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Accessibility**: Proper contrast ratios and touch targets

## 📍 Location & Maps Integration

### Google Maps API Integration
The app integrates with Google Maps APIs for:
- **Static Maps**: Generate map previews for saved locations
- **Geocoding**: Convert coordinates to human-readable addresses
- **Interactive Maps**: Display locations on interactive maps

### Location Services
- **GPS Access**: Uses expo-location for device location
- **Permission Handling**: Properly requests and handles location permissions
- **Coordinate Management**: Stores and manages latitude/longitude data

## 📸 Image Handling

### Camera Integration
- **Photo Capture**: Uses expo-camera for taking photos
- **Image Selection**: Uses expo-image-picker for selecting from gallery
- **Image Storage**: Stores image URIs for display and persistence

### Image Processing
- **Preview Generation**: Creates thumbnails for list views
- **Quality Optimization**: Balances image quality with performance
- **Storage Management**: Efficient handling of image data

## 💾 Data Persistence

### Local Storage Strategy
- **SQLite Database**: Uses expo-sqlite for local data storage
- **Redux State**: Manages app state and data flow
- **Image URIs**: Stores references to captured/selected images

### Data Flow
1. **User Input**: Form data captured from UI components
2. **Validation**: Input validation before saving
3. **State Update**: Redux state updated with new data
4. **Persistence**: Data saved to local SQLite database
5. **UI Update**: Components re-render with updated data

## 🔧 Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd My-Favorite-Location
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google Maps API**
   - Follow the instructions in `GOOGLE_MAPS_SETUP.md`
   - Add your API key to `utils/Location.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   
   # For web
   npm run web
   ```

## 🚀 Key Features Explained

### 1. **Location Picking**
- Uses Google Maps integration for precise location selection
- Converts coordinates to human-readable addresses
- Generates map previews for saved locations

### 2. **Image Management**
- Camera integration for taking photos
- Gallery access for selecting existing images
- Image preview and thumbnail generation

### 3. **State Management**
- Redux Toolkit for predictable state management
- Actions for adding, removing, and updating places
- Centralized state for app-wide data access

### 4. **Navigation**
- Stack-based navigation with smooth transitions
- Proper screen lifecycle management
- Header customization for each screen

### 5. **Data Persistence**
- Local SQLite database for offline functionality
- Redux state synchronization with local storage
- Efficient data loading and caching

## 🛠️ All Features & Commands Used

### 📱 **Core App Features**

#### **1. Location Services**
```javascript
// Location permission handling
const [locationPermissionStatus, requestLocationPermission] = useForegroundPermissions();

// Get current user location
const location = await getCurrentPositionAsync();

// Location picker with map integration
<LocationPicker currentLocation={(location) => setSelectedLocation(location)} />
```

#### **2. Camera & Image Handling**
```javascript
// Camera permissions
const [cameraPermissionStatus, requestCameraPermission] = useCameraPermissions();

// Take photo from camera
const result = await launchCameraAsync({
  allowsEditing: true,
  aspect: [16, 9],
  quality: 1,
});

// Select image from gallery
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ["images", "videos"],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
});
```

#### **3. Google Maps Integration**
```javascript
// Static map preview generation
export function getMapPreview(lat, long) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_MAP_API}`;
}

// Geocoding - convert coordinates to address
export async function getUserAddress(lat, long) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAP_API}`;
  const result = await fetch(url);
  const data = await result.json();
  return data.results[0].formatted_address;
}
```

#### **4. Database Operations**
```javascript
// SQLite database initialization
const database = SQLite.openDatabaseSync("places.db");

// Create table
export function init() {
  return database.runAsync(`
    CREATE TABLE IF NOT EXISTS places(
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      long REAL NOT NULL
    )
  `);
}

// Insert place data
export async function insearPlacedb(place) {
  return database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, long) VALUES (?,?,?,?,?)`
  );
}
```

#### **5. Redux State Management**
```javascript
// Redux slice with actions
const MyAppSlice = createSlice({
  name: "allPlaces",
  initialState: {
    allPlacesList: [],
    pickedLocation: { lat: "", long: "" },
  },
  reducers: {
    addFavoritePlace: (state, action) => {
      state.allPlacesList.push(action.payload);
    },
    removeFavoritePlace: (state, action) => {
      const placeIndex = state.allPlacesList.findIndex(
        (place) => place.id === action.payload.id
      );
      if (placeIndex !== -1) {
        state.allPlacesList.splice(placeIndex, 1);
      }
    },
    addPickedLocation: (state, action) => {
      state.pickedLocation = { ...action.payload };
    },
  },
});
```

#### **6. Navigation Commands**
```javascript
// Navigate to screen
navigation.navigate("addplace");

// Go back
navigation.pop();

// Pass parameters
navigation.navigate("placedetails", { placeId: id });

// Get route parameters
const route = useRoute();
const placeId = route.params?.placeId;
```

#### **7. UI Components & Styling**
```javascript
// Custom button components
<FilledButton onPress={onSaveDataClick}>Save</FilledButton>
<OutlinedButton icon="camera" onPress={takePhotoFormCamera}>
  Take photo
</OutlinedButton>
<IconButton icon="plus-circle" size={28} onPress={onPress} />

// Material Design components
<TextInput
  style={styles.inputText}
  placeholder="Enter title"
  mode="outlined"
  value={inputTitle}
  onChangeText={(text) => onInputChangeTextHandler("title", text)}
/>
```

#### **8. Permission Handling**
```javascript
// Location permissions
async function verifyPermission() {
  if (locationPermissionStatus.status === PermissionStatus.UNDETERMINED) {
    const permission = await requestLocationPermission();
    return permission.granted;
  }
  if (locationPermissionStatus.status === PermissionStatus.DENIED) {
    const permission = await requestLocationPermission();
    return permission.granted;
  }
  return true;
}

// Camera permissions
async function verifyPermission() {
  if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
    const permission = await requestCameraPermission();
    return permission.granted;
  }
  if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
    const permission = await requestCameraPermission();
    return permission.granted;
  }
  return true;
}
```

#### **9. Error Handling & Alerts**
```javascript
// Alert dialogs
Alert.alert("Error", "Please fill all data first");

// Try-catch error handling
try {
  const placeData = {
    id: new Date().toString() + Math.random().toString(),
    title: inputTitle,
    imageUri: selectedImageUri,
    location: {
      lat: selectedLocation.lat,
      long: selectedLocation.long,
      address: selectedLocation.address,
    },
  };
  dispatch(addFavoritePlace(placeData));
  navigation.pop();
} catch (error) {
  console.error("Error saving place:", error);
  Alert.alert("Error", "Failed to save place. Please try again.");
}
```

#### **10. Data Validation**
```javascript
// Form validation
if (!selectedLocation || inputTitle === "" || selectedImageUri === "") {
  Alert.alert("Error", "Please fill all data first");
  return;
}

// API response validation
if (!result.ok) {
  throw Error("Something went wrong with api!");
}
```

#### **11. Image Display & Preview**
```javascript
// Image component with URI
<Image source={{ uri: imageUri }} style={styles.imageStyle} />

// Conditional rendering for image preview
{imageUri && imageUri !== "" ? (
  <Image source={{ uri: imageUri }} style={styles.imageStyle} />
) : (
  <View style={styles.imageTextContainer}>
    <Text style={styles.imageTextStyle}>
      Not Image yet. Please select the image!
    </Text>
  </View>
)}
```

#### **12. Redux Hooks Usage**
```javascript
// useSelector for reading state
const getPlaceList = useSelector((state) => state.allPlaces.allPlacesList);
const pickedLocationData = useSelector((state) => state.allPlaces.pickedLocation);

// useDispatch for dispatching actions
const dispatch = useDispatch();
dispatch(addFavoritePlace(placeData));
dispatch(removePickedLocation());
```

#### **13. React Hooks**
```javascript
// State management
const [selectedImageUri, setSelectedImageUri] = useState("");
const [inputTitle, setInputTitle] = useState("");
const [selectedLocation, setSelectedLocation] = useState(null);

// Side effects
useEffect(() => {
  if (pickedLocationData.lat !== "" && pickedLocationData.long !== "") {
    setCurrentLocation({
      lat: pickedLocationData.latitude,
      long: pickedLocationData.longitude,
    });
  }
}, [pickedLocationData]);

// Cleanup effect
useEffect(() => {
  return () => {
    dispatch(removePickedLocation());
  };
}, [dispatch]);
```

#### **14. Async/Await Operations**
```javascript
// API calls
const result = await fetch(url);
const data = await result.json();

// Database operations
const result = await database.runAsync(query);

// Location services
const location = await getCurrentPositionAsync();

// Image picker
const result = await launchCameraAsync(options);
```

#### **15. Component Props & Callbacks**
```javascript
// Parent component passing callback
<ImagePickers onImageTaken={(imageUri) => setSelectedImageUri(imageUri)} />

// Child component receiving callback
export default function ImagePickers({ onImageTaken }) {
  // ... component logic
  onImageTaken(uri); // Call the callback
}
```

### 📋 **Development Commands**

#### **Package Management**
```bash
# Install dependencies
npm install

# Install specific package
npm install @react-navigation/native

# Update packages
npm update

# Check for outdated packages
npm outdated
```

#### **Expo Commands**
```bash
# Start development server
npm start
expo start

# Run on specific platform
npm run android
npm run ios
npm run web

# Build for production
expo build:android
expo build:ios

# Publish to Expo
expo publish
```

#### **Development Tools**
```bash
# Clear cache
expo r -c
npm start -- --clear

# Reset Metro bundler
npx react-native start --reset-cache

# Check Expo CLI version
expo --version

# Update Expo CLI
npm install -g @expo/cli@latest
```

#### **Debugging Commands**
```bash
# Enable debug mode
expo start --dev-client

# Open developer tools
expo start --web

# Check device logs
expo logs

# Run with specific configuration
expo start --tunnel
```

### 🔧 **Configuration Files**

#### **app.json (Expo Configuration)**
```json
{
  "expo": {
    "name": "My Favorite Location",
    "slug": "my-favorite-location",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]
  }
}
```

#### **package.json Scripts**
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

### 📱 **Platform-Specific Features**

#### **iOS Features**
- Location services with iOS permissions
- Camera integration with iOS photo library
- Push notifications (if implemented)
- iOS-specific UI components

#### **Android Features**
- Android location permissions
- Android camera integration
- Android-specific navigation gestures
- Android adaptive icons

#### **Cross-Platform Features**
- React Native core components
- Expo SDK for unified API access
- Redux for state management
- React Navigation for routing

## 🐛 Troubleshooting

### Common Issues
1. **Google Maps API Errors**: See `TROUBLESHOOTING.md` for detailed solutions
2. **Location Permissions**: Ensure location permissions are granted
3. **Image Loading**: Check file paths and permissions
4. **Navigation Issues**: Verify navigation setup and screen names

### Debug Information
- Console logging for API calls and data flow
- Redux DevTools integration for state debugging
- Error boundaries for graceful error handling

## 📚 Learning Resources

### React Native Concepts Covered
- **Component Lifecycle**: Understanding component mounting, updating, and unmounting
- **State Management**: Redux Toolkit patterns and best practices
- **Navigation**: React Navigation setup and usage
- **Platform APIs**: Camera, location, and storage integration
- **Performance**: Optimizing renders and data flow

### Advanced Topics
- **Async Operations**: Handling API calls and database operations
- **Error Handling**: Proper error boundaries and user feedback
- **Testing**: Unit testing strategies for React Native components
- **Deployment**: Building for production and app store submission

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Expo Team**: For the excellent development platform
- **React Native Community**: For the amazing ecosystem
- **Google Maps Platform**: For location and mapping services
- **Material Design**: For the design system inspiration

---

**Note**: This README serves as both documentation and a learning resource. Each section explains not just what the code does, but why it's implemented this way and what concepts it demonstrates. This makes it an excellent reference for understanding React Native development patterns and best practices. 