import React, { useEffect, useState } from "react";
import { fetchMood } from "../api/apiClient";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiAlertTriangle,
  FiSmile,
  FiBarChart2,
  FiTarget,
  FiZap
} from "react-icons/fi";

export default function MoodTracker({ userId }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetchMood(userId);
        setStats(r.data || {});
      } catch (e) {
        console.error("mood error", e);
      }
    }
    load();
  }, [userId]);

  if (!stats)
    return <div className="muted">Loading mood stats…</div>;

  const emotions = stats.emotion_counts || {};
  const triggers = stats.trigger_counts || {};
  const escalations = stats.escalation_counts || {};

  return (
    <motion.div
      className="mood-container"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="mood-title">Mood Tracker</h3>

      <div className="mood-grid">

        {/* Total Messages */}
        <motion.div className="mood-card">
          <FiBarChart2 className="mood-icon" />
          <div className="mood-value">{stats.count}</div>
          <div className="mood-label">Messages Analyzed</div>
        </motion.div>

        {/* Sentiment */}
        <motion.div className="mood-card">
          <FiSmile className="mood-icon" />
          <div className="mood-meter meter-sentiment">
            <div
              className="meter-fill"
              style={{
                width: `${(stats.avg_sentiment + 1) * 50}%`,
                background:
                  stats.avg_sentiment > 0
                    ? "#4a8fe7"
                    : stats.avg_sentiment < -0.2
                    ? "#d9534f"
                    : "#e7a44a",
              }}
            ></div>
          </div>
          <div className="mood-label">
            Avg Sentiment: {(stats.avg_sentiment ?? 0).toFixed(3)}
          </div>
        </motion.div>

        {/* Empathy */}
        <motion.div className="mood-card">
          <FiHeart className="mood-icon" />
          <div className="mood-meter meter-empathy">
            <div
              className="meter-fill"
              style={{
                width: `${stats.avg_empathy * 100}%`,
                background: "#2f8f8b",
              }}
            ></div>
          </div>
          <div className="mood-label">
            Avg Empathy: {(stats.avg_empathy ?? 0).toFixed(3)}
          </div>
        </motion.div>

        {/* Risk Count */}
        <motion.div className="mood-card">
          <FiAlertTriangle className="mood-icon risk" />
          <div className="mood-value risk-value">{stats.risk_count}</div>
          <div className="mood-label">Risk Indicators</div>
        </motion.div>

        {/* Avg Risk Intensity */}
        <motion.div className="mood-card">
          <FiZap className="mood-icon" />
          <div className="mood-value">
            {(stats.avg_risk_intensity ?? 0).toFixed(3)}
          </div>
          <div className="mood-label">Avg Risk Intensity</div>
        </motion.div>

        {/* Avg Input Length */}
        <motion.div className="mood-card">
          <FiTarget className="mood-icon" />
          <div className="mood-value">
            {stats.avg_input_length}
          </div>
          <div className="mood-label">Avg Input Length</div>
        </motion.div>

      </div>

      {/* Emotion Distribution */}
      <div className="emotion-title">Emotion Distribution</div>
      <div className="emotion-list">
        {Object.entries(emotions).map(([emo, count], i) => (
          <motion.div
            key={emo}
            className="emotion-row"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="emotion-name">{emo}</div>
            <div className="emotion-bar">
              <div
                className="emotion-bar-fill"
                style={{
                  width: `${(count / stats.count) * 100}%`,
                }}
              ></div>
            </div>
            <div className="emotion-count">{count}</div>
          </motion.div>
        ))}
      </div>

      {/* Trigger Words */}
      <div className="emotion-title">Trigger Word Counts</div>
      <div className="emotion-list">
        {Object.entries(triggers).map(([t, c]) => (
          <div className="emotion-row" key={t}>
            <div className="emotion-name">{t}</div>
            <div className="emotion-bar">
              <div
                className="emotion-bar-fill"
                style={{ width: `${(c / stats.count) * 100}%` }}
              />
            </div>
            <div className="emotion-count">{c}</div>
          </div>
        ))}
      </div>

      {/* Escalation */}
      <div className="emotion-title">Escalation Actions</div>
      <div className="emotion-list">
        {Object.entries(escalations).map(([e, c]) => (
          <div className="emotion-row" key={e}>
            <div className="emotion-name">{e}</div>
            <div className="emotion-bar">
              <div
                className="emotion-bar-fill"
                style={{ width: `${(c / stats.count) * 100}%` }}
              />
            </div>
            <div className="emotion-count">{c}</div>
          </div>
        ))}
      </div>

    </motion.div>
  );
}
