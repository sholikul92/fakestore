import Header from './components/Header';
import CardList from './components/CardList';

export default function App() {
  return (
    <>
      <Header />
      <main className='pt-28 p-14 bg-background dark:bg-dark-background'>
        <CardList />
      </main>
    </>
  );
}
