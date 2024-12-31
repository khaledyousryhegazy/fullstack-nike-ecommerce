import Statistics from "@/components/dashboard/Statistics";
import Graph from "@/components/dashboard/Graph";
import Earning from "@/components/dashboard/Earning";

export default function Dashboard() {
    return (
        <div>
            <Statistics />
            <Earning />
            <Graph />
        </div>
    )
}
