import React from "react";
import {
  BusFront,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CloudSun,
  Edit3,
  MapPin,
  MoreHorizontal,
  Plus,
  Shirt,
  Trash2,
} from "lucide-react";
import { busArrival, departure, todos, weather } from "./data/mockData.js";
import { getOutfitRecommendation } from "./utils/outfitRules.js";
import { getDepartureStatus } from "./utils/timeUtils.js";

function Header() {
  return (
    <header className="app-header">
      <a className="wordmark" href="/" aria-label="ReadyGo 홈">
        <span>Ready</span>
        <strong>Go</strong>
      </a>
      <button className="icon-button" aria-label="더보기">
        <MoreHorizontal size={20} strokeWidth={2.4} />
      </button>
    </header>
  );
}

function DepartureTimePanel() {
  const departureStatus = getDepartureStatus(departure.targetTime);

  return (
    <section
      className={`hero-panel departure-${departureStatus.status}`}
      aria-labelledby="departure-title"
    >
      <div className="panel-kicker">
        <Clock3 size={18} />
        <span>외출까지</span>
      </div>
      <div className="hero-content">
        <div>
          <h1 id="departure-title">{departureStatus.primary}</h1>
          <p>{departureStatus.secondary}</p>
        </div>
        <button className="ghost-button">
          <Edit3 size={16} />
          수정
        </button>
      </div>
      <div className="departure-progress-card">
        <div className="departure-progress-meta">
          <span>준비 게이지</span>
          <strong>외출 시각 {departure.targetTime}</strong>
        </div>
        <div className="departure-progress-track" aria-hidden="true">
          <div
            className="departure-progress-fill"
            style={{ width: `${departureStatus.progress}%` }}
          />
        </div>
        <p>
          {departureStatus.status === "waiting"
            ? "외출 1시간 전부터 게이지가 차기 시작해요."
            : "외출 시각에 가까워질수록 게이지가 채워져요."}
        </p>
      </div>
    </section>
  );
}

function TodoPanel() {
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <section className="panel" aria-labelledby="todo-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Checklist</p>
          <h2 id="todo-title">챙길 준비물</h2>
        </div>
        <button className="round-action" aria-label="준비물 추가">
          <Plus size={20} />
        </button>
      </div>

      <div className="progress-row">
        <span>
          {completedCount}/{todos.length} 완료
        </span>
        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-fill"
            style={{ width: `${(completedCount / todos.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li className={todo.completed ? "todo-item is-done" : "todo-item"} key={todo.id}>
            <button className="check-button" aria-label={`${todo.title} 완료 상태`}>
              <CheckCircle2 size={22} />
            </button>
            <span>{todo.title}</span>
            <div className="todo-actions">
              <button aria-label={`${todo.title} 수정`}>
                <Edit3 size={16} />
              </button>
              <button aria-label={`${todo.title} 삭제`}>
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WeatherPanel() {
  const recommendation = getOutfitRecommendation(weather.temperature);

  return (
    <section className="panel weather-panel" aria-labelledby="weather-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Weather</p>
          <h2 id="weather-title">오늘 날씨</h2>
        </div>
        <CloudSun className="panel-icon" size={28} />
      </div>

      <div className="weather-grid">
        <div>
          <strong>{weather.temperature}°</strong>
          <span>{weather.condition}</span>
        </div>
        <div>
          <strong>{weather.apparentTemperature}°</strong>
          <span>체감</span>
        </div>
        <div>
          <strong>{weather.precipitation}%</strong>
          <span>강수</span>
        </div>
      </div>

      <div className="recommendation">
        <Shirt size={20} />
        <p>{recommendation}</p>
      </div>
    </section>
  );
}

function BusPanel() {
  const arrivalSlots = Array.from({ length: 4 }, (_, index) => busArrival.arrivals[index]);

  return (
    <section className="panel bus-panel" aria-labelledby="bus-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Transit</p>
          <h2 id="bus-title">관심 정류장</h2>
        </div>
        <div className="stop-inline">
          <MapPin size={17} />
          <strong>{busArrival.stopName}</strong>
          <span>{busArrival.direction}</span>
        </div>
        <button className="text-button">
          변경
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="arrival-list" aria-label="버스 도착 정보">
        {arrivalSlots.map((arrival, index) =>
          arrival ? (
            <article className="arrival-card" key={arrival.routeId}>
              <div className="route-badge">
                <BusFront size={18} />
                <strong>{arrival.routeName}</strong>
              </div>
              <div>
                <strong>{arrival.arrivalMessage}</strong>
                <span>혼잡도 {arrival.congestion}</span>
              </div>
            </article>
          ) : (
            <article className="arrival-card arrival-empty" key={`empty-${index}`}>
              <span>대기 중</span>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="app-shell">
      <Header />
      <div className="dashboard-grid">
        <DepartureTimePanel />
        <TodoPanel />
        <WeatherPanel />
        <BusPanel />
      </div>
    </main>
  );
}
