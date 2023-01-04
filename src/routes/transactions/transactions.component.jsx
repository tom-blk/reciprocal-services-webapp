import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";

const Transactions = () => {

    return(
        <PageContainer>
            <div>Pending Transactions</div>
            <TransactionsList completed={false}/>
            <div>Completed Transactions</div>
            <TransactionsList completed={true}/>
        </PageContainer>
    )
}

export default Transactions