# app-viagens-rn

React Native port of `app-viagens/` — same three screens (Home, Passagens, Detalhes), same flight search API, just running on iOS / Android instead of the browser.

This is a straight 1:1 port intended as a university project. The original web version stays in `../app-viagens/` for reference.

## Stack

- React Native 0.85 (bare CLI, no Expo)
- `@react-navigation/native` + native-stack — replaces React Router
- `react-native-vector-icons` (MaterialCommunityIcons) — replaces `@boxicons/react`
- `@react-native-picker/picker` — replaces `<select>`
- `@react-native-community/datetimepicker` — replaces `<input type="date">`

## Getting started

### 1. Install JS deps

```sh
npm install
```

### 2. iOS extras (macOS only)

```sh
cd ios && bundle install && bundle exec pod install && cd ..
```

### 3. Run

```sh
# Android emulator (needs Android Studio set up)
npm run android

# iOS simulator (macOS only)
npm run ios
```

If Metro isn't already running, `run-android` / `run-ios` will start it automatically. Otherwise:

```sh
npm start
```

## Project layout

```
app-viagens-rn/
  App.jsx                       NavigationContainer + Stack (3 screens)
  index.js                      RN entry — registers App
  assets/                       Images (Munique, malas, ícones)
  src/
    screens/
      Home/HomeScreen.jsx          ← from pages/home/main_page.jsx
      Passagens/PassagensScreen.jsx ← from pages/Passagens/Passagens.jsx
      Detalhes/DetalhesScreen.jsx   ← from pages/Detalhes/Detalhes.jsx
    components/
      Button/                  Pressable wrapper
      Card/                    Card de destino (carrossel)
      CardPassagem/            Card de voo
      SearchForm/              Formulário de busca (TextInput + Picker + DateTimePicker)
      ApiStatus/               Indicador de status da API
      Carroceis/CarrocelSlide/ Carrossel horizontal (FlatList)
    testes/
      Button.test.jsx
      CardPassagem.test.jsx
```

## Web → React Native mapping

| Web (app-viagens) | React Native (app-viagens-rn) |
|---|---|
| `BrowserRouter` / `Routes` / `useNavigate` | `NavigationContainer` / `Stack.Navigator` / `navigation.navigate` |
| `useParams()` / `useLocation().state` | `route.params` |
| CSS Modules (`*.module.css`) | `StyleSheet.create` no próprio componente |
| `@boxicons/react` | `react-native-vector-icons/MaterialCommunityIcons` |
| `<input type="text">` | `<TextInput>` |
| `<input type="date">` | `<DateTimePicker>` |
| `<select>` | `<Picker>` (`@react-native-picker/picker`) |
| `<button>` | `<Pressable>` |
| `<img src="/Munique.jpg">` | `<Image source={require('../../assets/Munique.jpg')} />` |
| CSS `background-image` | `<ImageBackground>` |

## Notes

- The API endpoint (`travelagencyapi-a5zb.onrender.com`) is identical to the web version.
- `react-native-vector-icons` font is wired up:
  - Android: `android/app/build.gradle` applies `fonts.gradle` and exports `MaterialCommunityIcons.ttf`.
  - iOS: `ios/AppViagensRN/Info.plist` declares `UIAppFonts`.
- Tests use `@testing-library/react-native` with the `@react-native/jest-preset` (configured in `jest.config.js`).
