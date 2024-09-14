import React, { useState, useEffect } from "react";

// Fonction d'easing qui ralentit vers la fin
const easeOutQuad = (t: number): number => t * (2 - t);

const CounterAnimation: React.FC<{ target?: number; duration?: number }> = ({
  target = 1000,
  duration = 2000,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const start: number = performance.now(); // Obtenir le temps de démarrage

    // Fonction de mise à jour du compteur
    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - start; // Temps écoulé
      const progress = Math.min(elapsedTime / duration, 1); // Progression de 0 à 1

      // Appliquer la fonction d'easing
      const easedProgress = easeOutQuad(progress);

      // Calculer la nouvelle valeur du compteur
      setCount(Math.floor(easedProgress * target));

      // Continuer l'animation si elle n'est pas terminée
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    // Démarrer l'animation
    requestAnimationFrame(updateCount);
  }, [target, duration]);

  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
      {count}
    </div>
  );
};

export default CounterAnimation;
