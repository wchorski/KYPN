"use client"
import { Suspense, use } from "react"

// Simulated async function that throws a promise
const fetchData = async () => {
	await new Promise((resolve) => setTimeout(resolve, 6000)) // Simulating network delay
	// return Math.random() > 0.5 ? ['Item 1', 'Item 2', 'Item 3'] : []
	return ["fake Item 1 suspense", "fake Item 2 suspense", "fake Item 3 suspense"]
}

// Wrapper to make async fetching usable in Suspense (React 19+)
const dataPromise = fetchData()

export const FakeDataComponent = () => {
	return (
		<Suspense fallback={<Loading />}>
			<DataFetcher />
		</Suspense>
	)
}

const DataFetcher = () => {
	const data = use(dataPromise) // React will suspend until data is ready

	if (!data || data.length === 0) return <NoData />

	return <DataList data={data} />
}

const Loading = () => <p>fake Loading w suspense...</p>

const NoData = () => <p>No fake data found</p>

const DataList = ({ data }: { data: string[] }) => (
	<ul>
		{data.map((item, index) => (
			<li key={index}>{item}</li>
		))}
	</ul>
)
