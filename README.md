# MECH CONNECT AI

> **"Your Vehicle. Our AI. Help When You Need It."**

A simple, clean, modern, and professional frontend website for **MECH CONNECT AI** with two dedicated portals:

---

## 🧭 Application Structure

### 1. Main Landing Page (`/`)
- MECH CONNECT AI Logo (Car + Mechanical gear/wrench + AI element)
- Two clean primary choices:
  - **[ MECHANIC ]**
  - **[ USER / DRIVER ]**

---

### 2. Mechanic Portal
- **Login & Registration (`/mechanic/auth`)**:
  - Garage registration: Garage Name, Mechanic Name, Phone, Email, Garage Address, Services, Password.
- **Mechanic Home (`/mechanic`)**:
  - "Welcome, Mechanic"
  - Nearby Assistance Requests cards: User name, Vehicle problem, Distance, Location, Time, `[ View ]`, `[ Accept ]`.
- **Requests Page (`/mechanic/requests`)**:
  - Active requests list with `[ Accept ]` and `[ Reject ]`.
  - When accepted: shows "Request Accepted", user location, and `[ Navigate to User ]` / `[ Mark Completed ]`.
- **Completed Page (`/mechanic/completed`)**:
  - Clean list of completed requests (User, Problem, Date, Garage/service).
- **Mechanic Profile (`/mechanic/profile`)**:
  - Garage details, Edit profile mode, and Logout.

---

### 3. User / Driver Portal
- **Login & Registration (`/user/auth`)**:
  - Name, Phone, Email, Password, optional Vehicle Info (Brand, Model, Number).
- **User Home Page (`/user`)**:
  - "How can we help you?"
  - 🔧 **FIND NEARBY GARAGE** -> `[ Find Garage ]`
  - 🤖 **AI VEHICLE HELP** -> `[ Get AI Help ]`
  - 🚨 **EMERGENCY HELP** -> `[ Request Emergency Mechanic ]`
- **Find Nearby Garage (`/user/garages`)**:
  - Simple map with user's current location & nearby garage markers.
  - Garage cards: Garage Name, Distance, Rating, Services, `[ View ]`, `[ Request Help ]`.
- **AI Help Page (`/user/ai-help`)**:
  - "AI Vehicle Assistant"
  - Type the problem OR upload vehicle image -> `[ Analyze Problem ]`.
  - Problem name, Step 1/2/3 solution, 🟢 `SIMPLE PROBLEM` or 🔴 `COMPLEX PROBLEM` tag.
  - Buttons: `[ Find Nearby Garage ]`, `[ Emergency Help ]`.
- **Emergency Help (`/user/emergency`)**:
  - Issue selection (Vehicle Breakdown, Flat Tyre, Battery Problem, Engine Problem, Other), current location, `[ 🚨 SEND EMERGENCY REQUEST ]` with confirmation dialog.
  - Real-time search animation -> Mechanic acceptance screen showing garage info, user location 📍, mechanic location 🔧, simple tracking map, route, distance, and estimated arrival.
- **User Profile (`/user/profile`)**:
  - Personal info, Vehicle details, Edit profile mode, and Logout.

---

## 🛠️ Technology Stack
- **Frontend**: React 18, React Router DOM v6
- **Styling**: Modern clean CSS with Tailwind CSS v4
- **Icons**: Lucide React
- **Interactive Maps**: Leaflet & React-Leaflet

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```
