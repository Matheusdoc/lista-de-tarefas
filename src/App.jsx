import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { getTranslation } from "./i18n";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "pt"
  );

  const t = getTranslation(language);

  // Só abre o modal automaticamente se não tiver idioma salvo
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleSelectLanguage(lang) {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setShowModal(false);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6 relative">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          {t.title}
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} t={t} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>

      {/* Botão para reabrir modal */}
      <button
        className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
        onClick={() => setShowModal(true)}
      >
        🌐 {t.languages[language]}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {t.chooseLanguage}
            </h2>
            <div className="flex flex-col gap-2">
              <button
                className="bg-blue-500 text-white py-2 rounded"
                onClick={() => handleSelectLanguage("pt")}
              >
                {t.languages.pt}
              </button>
              <button
                className="bg-green-500 text-white py-2 rounded"
                onClick={() => handleSelectLanguage("en")}
              >
                {t.languages.en}
              </button>
              <button
                className="bg-yellow-500 text-white py-2 rounded"
                onClick={() => handleSelectLanguage("es")}
              >
                {t.languages.es}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
