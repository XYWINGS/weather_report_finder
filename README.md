
## 🌤️ RainOrShine — Dynamic Weather Visualizer

RainOrShine is a sleek, responsive weather web app that transforms raw weather conditions into rich visual experiences. From stormy skies to sunny days, the UI adjusts with gradients, animations, and icons.

## Live Demo - https://weather-report-finder-bv3qwqmdf-xywingss-projects.vercel.app

## ✨ Features

- 🔁 **Real-time weather rendering** via condition codes
- 🎨 **Dynamic background gradients** for rain, snow, clouds, sun, mist, and more
- 🌩️ **Animated weather effects** like rain, thunderstorm, fog, and sunshine
- 🌐 **City-based weather fetcher** — test different conditions using real-world locations
- 📱 **Responsive design** for mobile & desktop

## 🚀 Getting Started

### 1. Clone the repo

https://github.com/XYWINGS/weather_report_finder.git

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm run dev
```

> App will run on `http://localhost:5173`

---

## 🧠 How It Works

- Weather API returns a weather response for the users default location initially. After that users can get weather reports from typing and searching city names.
- Weather condition code is matched against **pre-defined groups**

  - 🌈 **Gradient** background (`getWeatherGradient`)
  - 🎞️ **Animation** layer (`getWeatherAnimation`)
  - 🧊 **Iconography** (`getWeatherIcon`)

---

## 🧩 Tech Stack

- ⚛️ React / Vite
- 🌈 MUI + Custom SVG Icons
- 🔁 WeatherAPI
- 🧪 TypeScript for type safety
- 🧊 Redux for state management

---

## 💬 Feedback / Contributions

Open an issue or submit a PR. We welcome feedback and improvements!

> Built with ❤️ and curiosity.
