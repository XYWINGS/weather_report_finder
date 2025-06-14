
## 🌤️ RainOrShine — Dynamic Weather Visualizer

RainOrShine is a sleek, responsive weather web app that transforms raw weather conditions into rich visual experiences. From stormy skies to sunny days, the UI adjusts with gradients, animations, and icons — all driven by condition codes.


## ✨ Features

- 🔁 **Real-time weather rendering** via condition codes
- 🎨 **Dynamic background gradients** for rain, snow, clouds, sun, mist, and more
- 🌩️ **Animated weather effects** like rain, thunderstorm, fog, and sunshine
- 🌐 **City-based weather fetcher** — test different conditions using real-world locations
- 📱 **Responsive design** for mobile & desktop

## 🚀 Getting Started

### 1. Clone the repo

git https://github.com/XYWINGS/weather_report_finder.git
cd weather_report_finder

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

- Weather API returns a `condition.code`
- Code is matched against **pre-defined groups** (e.g., rainCodes, snowCodes, etc.)
- UI updates:

  - 🌈 **Gradient** background (`getWeatherGradient`)
  - 🎞️ **Animation** layer (`getWeatherAnimation`)
  - 🧊 **Iconography** (`getWeatherIcon`)

---

## 🧩 Tech Stack

- ⚛️ React / Vite
- 🌈 MUI + Custom SVG Icons
- 🔁 WeatherAPI
- 🧪 TypeScript for type safety
- 🧊 Redux for State Management

---

## 💬 Feedback / Contributions

Open an issue or submit a PR. We welcome feedback and improvements!

> Built with ❤️ and curiosity.
