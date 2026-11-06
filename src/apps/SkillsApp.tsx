import { useId, useState, type KeyboardEvent } from "react";
import { AppShell, StatusBar } from "../os/AppChrome";
import { SystemIcon } from "../os/SystemIcon";
import { skillCategories, skillsNote } from "../content/skills";

export function SkillsApp({ windowId }: { windowId: string }) {
  const [active, setActive] = useState(skillCategories[0].id);
  const baseId = useId();
  const activeCategory = skillCategories.find((category) => category.id === active) ?? skillCategories[0];
  const activeIndex = skillCategories.findIndex((category) => category.id === active);

  const selectTab = (id: string) => {
    setActive(id);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const nextIndex =
      (index + (event.key === "ArrowRight" ? 1 : -1) + skillCategories.length) %
      skillCategories.length;
    const next = skillCategories[nextIndex];
    selectTab(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  };

  const selectedIndex = activeIndex < 0 ? 0 : activeIndex;

  return (
    <AppShell windowId={windowId} className="skills-app">
      <div className="app-scroll skills-scroll">
        <header className="skills-intro">
          <SystemIcon name="skills" size={46} />
          <div>
            <p className="file-path">C:\Users\Vraj\System\inventory.list</p>
            <h1>A working toolkit</h1>
            <p className="skills-lede">
              Technologies and areas I've explored, with an honest note on where each
              one has shown up.
            </p>
          </div>
        </header>

        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category, index) => (
            <button
              key={category.id}
              id={`${baseId}-tab-${category.id}`}
              type="button"
              role="tab"
              aria-selected={active === category.id}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={active === category.id ? 0 : -1}
              className={`skill-tab ${active === category.id ? "is-active" : ""}`}
              onClick={() => selectTab(category.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {category.label}
              <span className="tab-count">{category.skills.length}</span>
            </button>
          ))}
        </div>

        <section
          className="skill-panel"
          role="tabpanel"
          id={`${baseId}-panel-${activeCategory.id}`}
          aria-labelledby={`${baseId}-tab-${activeCategory.id}`}
          tabIndex={0}
        >
          <div className="skill-panel-head">
            <div>
              <h2>{activeCategory.label}</h2>
              <p>{activeCategory.blurb}</p>
            </div>
            <span className="panel-index">
              {String(selectedIndex + 1).padStart(2, "0")} / {String(skillCategories.length).padStart(2, "0")}
            </span>
          </div>

          <ul className="skill-grid">
            {activeCategory.skills.map((skill) => (
              <li className="skill-card" key={skill.name}>
                <span className={`skill-badge tone-${skill.tone}`} aria-hidden="true">
                  {skill.initials}
                </span>
                <span className="skill-copy">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-note">{skill.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="skills-note">
          <span className="info-glyph" aria-hidden="true">i</span>
          <p>{skillsNote}</p>
        </div>
      </div>

      <StatusBar
        left={`${skillCategories.reduce((total, category) => total + category.skills.length, 0)} entries`}
        right="Things I've used, not a leaderboard"
      />
    </AppShell>
  );
}
