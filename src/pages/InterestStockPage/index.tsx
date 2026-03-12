import StockListSection from '@/components/common/StockListSection';
import { MOCK_STOCKS } from '@/pages/stocks/mockStocks';

function InterestStockPage() {
  return <StockListSection items={MOCK_STOCKS} showChart />;
}

export default InterestStockPage;
