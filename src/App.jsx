import { TableWithChart } from './components/TableWithChart/TableWithChart';
import { Container } from './UI/Container/Container';
import './App.css';

export const App = () => {
  return (
    <main>
      <Container>
        <TableWithChart />
      </Container>
    </main>
  );
};
