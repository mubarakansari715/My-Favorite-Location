# Google Maps API Troubleshooting Guide

## Quick Debug Steps

### 1. Test Your API Key
- Tap the "Test API" button in your app
- Check the console output for detailed error messages
- Look for the debug information showing your API key and URL

### 2. Common Error Messages & Solutions

#### "This API project is not authorized to use this API"
**Solution**: Enable the Maps Static API in Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Library"
3. Search for "Maps Static API"
4. Click "Enable"

#### "API key not valid"
**Solution**: Check your API key configuration
1. Go to "APIs & Services" > "Credentials"
2. Verify your API key is correct
3. Check that billing is enabled for your project

#### "Quota exceeded"
**Solution**: Check your usage limits
1. Go to "APIs & Services" > "Quotas"
2. Check if you've exceeded the free tier limits
3. Consider upgrading your billing plan

#### "Request denied"
**Solution**: Check API key restrictions
1. Go to "APIs & Services" > "Credentials"
2. Click on your API key
3. Ensure restrictions are not too strict
4. For testing, temporarily remove restrictions

### 3. Step-by-Step Fix

1. **Enable Billing** (Required):
   - Go to Google Cloud Console > Billing
   - Link a billing account to your project
   - Google Maps APIs require billing (but you get $200 free credit)

2. **Enable Required APIs**:
   - Maps Static API (required for your app)
   - Maps JavaScript API (if you plan interactive maps)

3. **Configure API Key**:
   - Go to Credentials
   - Click on your API key
   - Set Application restrictions to "None" for testing
   - Set API restrictions to "Don't restrict key" for testing

4. **Test Again**:
   - Restart your Expo development server
   - Tap "Test API" button
   - Check console for success message

### 4. Environment Variables (Optional but Recommended)

Create a `.env` file in your project root:
```
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 5. Console Debug Information

The app now shows detailed debug information in the console:
- Your API key (first 10 characters)
- The full URL being requested
- Coordinates being used
- Any error responses from Google

### 6. Still Having Issues?

1. **Check the console output** - it will show exactly what's failing
2. **Try the test URL directly** in your browser to see the error
3. **Verify your project ID** matches in Google Cloud Console
4. **Check if you have multiple projects** - ensure you're in the right one

### 7. Quick Test

You can test your API key directly in a browser:
```
https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=400x200&maptype=roadmap&key=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your actual API key. If it shows an image, your API is working. If it shows an error, you'll see the specific issue. 