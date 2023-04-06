interface CardSchema {
  id: string;
  title: string;
  subtitle: string;
}
export const cards: CardSchema[] = [
  {
    id: self.crypto.randomUUID(),
    title: 'Видеолекции',
    subtitle:
      'Короткие последовательные ролики без воды со спикером, которому можно написать, если ты что-то не понял',
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Твои личные задачи на генерацию',
    subtitle:
      'Ты создашь обложки альбомов, сейлз письма, контент для лендингов и презентаций, тексты для соцсетей и блогов',
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Материалы и кейсы',
    subtitle:
      'Саммари лекций в текстовом виде и подборки задач для нейросетки, с которыми ты сам играешься после лекции',
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Простой доступ к самим нейросетям',
    subtitle:
      'Покажем, как легко зайти в ChatGPT и Midjourney и почувствовать себя, как рыбка в воде',
  },
];

export const smallPromoCodes: string[] = ['sekta', 'mygap', 'Insiders', 'mesto', 'sber500'];
export const bigPromoCodes: string[] = ['iloveAI'];
export const promoCodes: string[] = [...smallPromoCodes, ...bigPromoCodes];
