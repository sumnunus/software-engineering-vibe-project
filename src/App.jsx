import React, { useCallback, useEffect, useRef, useState } from "react";
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
  RefreshCw,
  Search,
  Shirt,
  Trash2,
  X,
} from "lucide-react";
import { busStops, departure } from "./data/mockData.js";
import { useTodos } from "./hooks/useTodos.js";
import { fetchBusArrivals, searchBusStops } from "./services/busService.js";
import { getCurrentLocation } from "./services/locationService.js";
import { loadBusStop, saveBusStop } from "./services/storageService.js";
import { fetchWeather } from "./services/weatherService.js";
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
  const {
    todos,
    completedCount,
    errorMessage,
    isAllCompleted,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  } = useTodos();
  const [isAdding, setIsAdding] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const addFormRef = useRef(null);
  const addButtonRef = useRef(null);
  const deletePopoverRef = useRef(null);
  const newTodoInputRef = useRef(null);

  useEffect(() => {
    if (!isAdding) {
      return undefined;
    }

    function handlePointerDown(event) {
      const target = event.target;
      const clickedInsideForm = addFormRef.current?.contains(target);
      const clickedAddButton = addButtonRef.current?.contains(target);

      if (!clickedInsideForm && !clickedAddButton) {
        setIsAdding(false);
        setNewTodoTitle("");
        clearError();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [clearError, isAdding]);

  useEffect(() => {
    if (!pendingDeleteId) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!deletePopoverRef.current?.contains(event.target)) {
        setPendingDeleteId(null);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleDelete(pendingDeleteId);
      }

      if (event.key === "Escape") {
        setPendingDeleteId(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pendingDeleteId]);

  function handleAddSubmit(event) {
    event.preventDefault();

    if (addTodo(newTodoTitle)) {
      setNewTodoTitle("");
      setIsAdding(true);
      requestAnimationFrame(() => {
        newTodoInputRef.current?.focus();
      });
    }
  }

  function startEditing(todo) {
    clearError();
    setIsAdding(false);
    setPendingDeleteId(null);
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  }

  function handleEditSubmit(event, todoId) {
    event.preventDefault();

    if (updateTodo(todoId, editingTitle)) {
      setEditingTodoId(null);
      setEditingTitle("");
    }
  }

  function handleDelete(todoId) {
    deleteTodo(todoId);
    setPendingDeleteId(null);
  }

  const progressWidth = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <section className="panel" aria-labelledby="todo-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Checklist</p>
          <h2 id="todo-title">챙길 준비물</h2>
        </div>
        <button
          ref={addButtonRef}
          className="round-action"
          aria-label="준비물 추가"
          onClick={() => {
            clearError();
            setPendingDeleteId(null);
            setIsAdding((current) => !current);
          }}
          type="button"
        >
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
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {isAllCompleted ? (
        <div className="todo-complete-banner">
          <CheckCircle2 size={18} />
          <span>준비물 체크 완료!</span>
        </div>
      ) : null}

      {isAdding ? (
        <form className="todo-form" onSubmit={handleAddSubmit} ref={addFormRef}>
          <input
            aria-label="새 준비물"
            autoFocus
            ref={newTodoInputRef}
            onChange={(event) => setNewTodoTitle(event.target.value)}
            placeholder="챙길 준비물을 입력해 주세요"
            value={newTodoTitle}
          />
          <button type="submit">추가</button>
        </form>
      ) : null}

      {errorMessage ? <p className="form-message">{errorMessage}</p> : null}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li className={todo.completed ? "todo-item is-done" : "todo-item"} key={todo.id}>
            <button
              className="check-button"
              aria-label={`${todo.title} 완료 상태 변경`}
              onClick={() => toggleTodo(todo.id)}
              type="button"
            >
              <CheckCircle2 size={22} />
            </button>

            {editingTodoId === todo.id ? (
              <form className="todo-edit-form" onSubmit={(event) => handleEditSubmit(event, todo.id)}>
                <input
                  aria-label={`${todo.title} 수정`}
                  autoFocus
                  onChange={(event) => setEditingTitle(event.target.value)}
                  value={editingTitle}
                />
                <button type="submit">저장</button>
              </form>
            ) : (
              <>
                <span>{todo.title}</span>
                <div className="todo-actions">
                  <button aria-label={`${todo.title} 수정`} onClick={() => startEditing(todo)} type="button">
                    <Edit3 size={16} />
                  </button>
                  <button
                    aria-label={`${todo.title} 삭제 확인 열기`}
                    onClick={() => {
                      clearError();
                      setPendingDeleteId((currentId) => (currentId === todo.id ? null : todo.id));
                    }}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                  {pendingDeleteId === todo.id ? (
                    <div className="delete-confirm" ref={deletePopoverRef}>
                      <p>삭제할까요?</p>
                      <div className="delete-confirm-actions">
                        <button
                          className="delete-cancel-button"
                          onClick={() => setPendingDeleteId(null)}
                          type="button"
                        >
                          취소
                        </button>
                        <button
                          className="delete-confirm-button"
                          onClick={() => handleDelete(todo.id)}
                          type="button"
                        >
                          <Trash2 size={13} />
                          삭제하기
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function WeatherPanel() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      setIsLoading(true);
      const location = await getCurrentLocation();
      const nextWeather = await fetchWeather(location);

      if (isMounted) {
        setWeatherData(nextWeather);
        setIsLoading(false);
      }
    }

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  const recommendation = weatherData
    ? getOutfitRecommendation(weatherData.temperature)
    : "";
  const updatedAt = weatherData ? formatWeatherTime(weatherData.fetchedAt) : "";

  return (
    <section className="panel weather-panel" aria-labelledby="weather-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Weather</p>
          <h2 id="weather-title">오늘 날씨</h2>
        </div>
        <CloudSun className="panel-icon" size={28} />
      </div>

      {isLoading ? (
        <div className="weather-loading" role="status">
          <span aria-hidden="true">☀️</span>
          <p>날씨를 불러오는 중이에요.</p>
        </div>
      ) : (
        <>
          <div className="weather-summary">
            <span className="weather-symbol" aria-hidden="true">
              <span className="weather-symbol-icon">{weatherData.icon}</span>
            </span>
            <div>
              <strong>{weatherData.temperature}°</strong>
              <span>{weatherData.condition}</span>
            </div>
          </div>

          <div className="weather-grid">
            <div>
              <strong>{weatherData.temperatureMin}°</strong>
              <span>최저</span>
            </div>
            <div>
              <strong>{weatherData.temperatureMax}°</strong>
              <span>최고</span>
            </div>
            <div>
              <strong>{weatherData.apparentTemperature}°</strong>
              <span>체감</span>
            </div>
            <div>
              <strong>
                {weatherData.precipitation}
                {weatherData.precipitationUnit}
              </strong>
              <span>강수</span>
            </div>
          </div>

          <div className="weather-meta" aria-label="날씨 데이터 정보">
            <span>{weatherData.locationName} 기준</span>
            <span>{updatedAt} 업데이트</span>
            {weatherData.isTemporary ? <strong>임시 데이터</strong> : null}
          </div>

          <div className="recommendation">
            <Shirt size={20} />
            <div>
              <span>현재 온도 기준</span>
              <p>{recommendation}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function formatWeatherTime(value) {
  return new Date(value).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function BusPanel() {
  const [selectedStop, setSelectedStop] = useState(() => loadBusStop(busStops[0]));
  const [busData, setBusData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchedWithFallback, setSearchedWithFallback] = useState(false);

  const loadArrivals = useCallback(async () => {
    setIsLoading(true);
    const nextBusData = await fetchBusArrivals(selectedStop);
    setBusData(nextBusData);
    setIsLoading(false);
  }, [selectedStop]);

  useEffect(() => {
    loadArrivals();
    const intervalId = window.setInterval(loadArrivals, 1000 * 30);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadArrivals]);

  async function handleSearchSubmit(event) {
    event.preventDefault();
    setIsSearching(true);
    const result = await searchBusStops(searchTerm);
    setSearchResults(result.stops);
    setHasSearched(true);
    setSearchedWithFallback(result.isTemporary);
    setIsSearching(false);
  }

  function handleSelectStop(stop) {
    saveBusStop(stop);
    setSelectedStop(stop);
    setIsSelectorOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    setHasSearched(false);
    setSearchedWithFallback(false);
  }

  const arrivalSlots = Array.from({ length: 4 }, (_, index) => busData?.arrivals[index]);
  const duplicatedStopNames = searchResults.reduce((counts, stop) => {
    counts[stop.stopName] = (counts[stop.stopName] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <section className="panel bus-panel" aria-labelledby="bus-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Transit</p>
          <h2 id="bus-title">관심 정류장</h2>
        </div>
        <div className="stop-inline">
          <MapPin size={17} />
          <strong>{busData?.stopName ?? selectedStop.stopName}</strong>
          <span>{busData?.direction ?? selectedStop.direction}</span>
        </div>
        <div className="bus-actions">
          <button
            className={isLoading ? "refresh-button is-loading" : "refresh-button"}
            aria-label="버스 도착 정보 새로고침"
            onClick={loadArrivals}
            type="button"
          >
            <RefreshCw size={17} />
          </button>
          <button
            className="text-button"
            onClick={() => setIsSelectorOpen((current) => !current)}
            type="button"
          >
            변경
            {isSelectorOpen ? <X size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </div>

      {isSelectorOpen ? (
        <div className="bus-selector">
          <form className="bus-search-form" onSubmit={handleSearchSubmit}>
            <Search size={18} />
            <input
              aria-label="관심 정류장 검색"
              autoFocus
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="정류장 이름을 입력해 주세요"
              value={searchTerm}
            />
            <button disabled={isSearching} type="submit">
              {isSearching ? "검색 중" : "검색"}
            </button>
          </form>

          {searchedWithFallback ? (
            <p className="bus-selector-message">
              API 연결을 확인할 수 없어 예시 정류장을 보여드려요.
            </p>
          ) : null}

          {searchResults.length > 0 ? (
            <ul className="bus-stop-results">
              {searchResults.map((stop) => (
                <li key={`${stop.stopId}-${stop.arsId}`}>
                  <button onClick={() => handleSelectStop(stop)} type="button">
                    <MapPin size={16} />
                    <span>
                      <strong>{stop.stopName}</strong>
                      {duplicatedStopNames[stop.stopName] > 1 ? (
                        <small>정류소 번호 {stop.arsId}</small>
                      ) : null}
                    </span>
                    <ChevronRight size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : hasSearched ? (
            <p className="bus-selector-message">검색 결과가 없어요.</p>
          ) : null}
        </div>
      ) : null}

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

      <div className="bus-meta">
        <span>30초마다 자동 갱신</span>
        {busData?.fetchedAt ? <span>{formatWeatherTime(busData.fetchedAt)} 업데이트</span> : null}
        {busData?.isTemporary ? <strong>임시 데이터</strong> : null}
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
