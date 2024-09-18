// @ts-ignore

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Erreur lors du chargement des données");
    }
    return res.json();
  });
