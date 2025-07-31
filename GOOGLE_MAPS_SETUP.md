# Google Maps API Setup Guide

## The Issue
The error "The Google Maps Platform server rejected your request. This API project is not authorized to use this API" occurs when your Google Maps API key is not properly configured.

## How to Fix It

### 1. Enable Required APIs in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to "APIs & Services" > "Library"
4. Search for and enable these APIs:
   - **Maps Static API** (required for static map images)
   - **Maps JavaScript API** (if you plan to use interactive maps)
   - **Geocoding API** (if you need address lookup)

### 2. Configure API Key Restrictions

1. Go to "APIs & Services" > "Credentials"
2. Find your API key and click on it
3. Configure restrictions:
   - **Application restrictions**: Set to "Android apps" and add your app's package name
   - **API restrictions**: Select "Restrict key" and choose the APIs you enabled above

### 3. Update Your API Key

Replace the API key in these files:
- `utils/Location.js` (line 2)
- `app.json` (line 25)

### 4. Environment Variables (Recommended)

For better security, use environment variables:

1. Create a `.env` file in your project root:
```
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

2. The code is already configured to use this environment variable as a fallback.

### 5. Billing Setup

1. Go to "Billing" in Google Cloud Console
2. Link a billing account to your project
3. Google Maps APIs require billing to be enabled (but you get $200 free credit monthly)

### 6. Testing

After making these changes:
1. Restart your Expo development server
2. Test the location picker functionality
3. Check the console for any remaining errors

## Common Issues

- **API not enabled**: Make sure Maps Static API is enabled
- **Billing not set up**: Enable billing in Google Cloud Console
- **Key restrictions too strict**: Ensure your app's package name is added to restrictions
- **Quota exceeded**: Check your usage in Google Cloud Console

## Support

If you continue to have issues:
1. Check the Google Cloud Console for specific error messages
2. Verify your API key is correct
3. Ensure billing is properly configured
4. Check that all required APIs are enabled 