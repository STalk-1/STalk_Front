import StockListSection from '@/components/common/StockListSection';
import { MOCK_STOCKS } from '@/pages/stocks/mockStocks';

function AllStocksPage() {
  return <StockListSection items={MOCK_STOCKS} />;
}

export default AllStocksPage;
