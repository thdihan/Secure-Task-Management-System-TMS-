import { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import UserApi from "../api/UserApi";
import { formatDateAndTime } from "../utilities/formatDate";
import { overDueCheck } from "../utilities/overdueCheck";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Home() {
    const [priority, setPriority] = useState();
    const [due_date, setDueDate] = useState();
    const [sortDate, setSortDate] = useState(false);
    const [sortPriority, setSortPriority] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [storeTaskList, setStoreTaskList] = useState([]);

    const [searchBox, setSearchBox] = useState("");
    const { user } = useAuthContext();

    const priorityObject = {
        1: "High",
        2: "Medium",
        3: "Low",
    };

    // Sort By Date
    useEffect(() => {
        console.log("SORT DATE EFFECT :", sortDate);
        if (sortDate) {
            const sortedData = taskList?.sort(
                (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
            );
            console.log("SORTED DATA", sortedData);
            setTaskList([...sortedData]);
        }
    }, [sortDate]);

    // Get task By Date
    useEffect(() => {
        console.log("Get Task By DATE :");
        if (due_date) {
            const sortedData = storeTaskList.filter(
                (task) => formatDateAndTime(task.dueDate).date === due_date
            );
            console.log("SORTED DATA", sortedData);
            setTaskList([...sortedData]);
        } else {
            setTaskList([...storeTaskList]);
        }
    }, [due_date]);

    // Sort By Priority
    useEffect(() => {
        console.log("SORT DATE EFFECT :", sortDate);
        if (sortPriority) {
            const sortedData = taskList?.sort(
                (a, b) => a.priority - b.priority
            );
            console.log("SORTED DATA", sortedData);
            setTaskList([...sortedData]);
        }
    }, [sortPriority]);

    // Get task By Priority
    useEffect(() => {
        console.log("Get Task By Priority :");
        if (priority) {
            const sortedData = storeTaskList.filter(
                (task) => task.priority == priority
            );
            console.log("SORTED DATA", sortedData);
            setTaskList([...sortedData]);
        } else {
            setTaskList([...storeTaskList]);
        }
    }, [priority]);

    // Search task
    useEffect(() => {
        console.log("Get Task By Priority :");
        if (searchBox) {
            const newData = storeTaskList.filter((task) =>
                task.title?.includes(searchBox)
            );
            console.log("New DATA", newData);
            setTaskList([...newData]);
        } else {
            setTaskList([...storeTaskList]);
        }
    }, [searchBox]);
    // All Task
    useEffect(() => {
        async function getTaskList() {
            try {
                setLoading(true);
                setError(false);
                const response = await UserApi.get("/get-tasks", {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("Tasks: ", response.data.task);
                setTaskList(response.data.task);
                setStoreTaskList(response.data.task);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                setError(error);
            }
        }

        if (user) {
            getTaskList();
        }
    }, [user]);

    return (
        <div>
            {user && (
                <>
                    <div className={style["filter-sort"]}>
                        <form>
                            <div>
                                <label htmlFor="priority">Priority</label>
                                <select
                                    name="priority"
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => {
                                        console.log(
                                            "Priority field: ",
                                            parseInt(e.target.value)
                                        );
                                        setPriority(parseInt(e.target.value));
                                    }}
                                >
                                    <option value="default">Defualt</option>
                                    <option value="1">High</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Low</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="due_date">Due Data</label>
                                <input
                                    type="date"
                                    name="due_date"
                                    id="due_date"
                                    value={due_date}
                                    onChange={(e) => {
                                        console.log(
                                            "Date field",
                                            e.target.value
                                        );
                                        setDueDate(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={style["filter-button"]}>
                                <input
                                    type="button"
                                    className="btn"
                                    name="priority-sort"
                                    id="date-sort"
                                    value={`Sort By Priority`}
                                    onClick={() => {
                                        console.log(
                                            "sort data button",
                                            sortDate
                                        );
                                        setSortPriority((prev) => !prev);
                                    }}
                                />
                            </div>
                            <div className={style["filter-button"]}>
                                <input
                                    type="button"
                                    className="btn"
                                    name="date-sort"
                                    id="date-sort"
                                    value={`Sort By Date`}
                                    onClick={() => {
                                        console.log(
                                            "sort data button",
                                            sortDate
                                        );
                                        setSortDate((prev) => !prev);
                                    }}
                                />
                            </div>
                        </form>
                    </div>

                    <div className={style["search-box"]}>
                        <input
                            type="text"
                            name="search-box"
                            id=""
                            placeholder="Search Box (Title or Category)"
                            value={searchBox}
                            onChange={(e) => {
                                setSearchBox(e.target.value);
                            }}
                        />
                    </div>

                    <div className={style["taskbox"]}>
                        <h2>Task List</h2>

                        {taskList &&
                            !loading &&
                            !error &&
                            taskList.map((task, index) => (
                                <div
                                    key={index}
                                    className={`${style["singleBox"]} ${
                                        overDueCheck(task.dueDate)
                                            ? style["red"]
                                            : task.completed
                                            ? style["green"]
                                            : style["yellow"]
                                    }`}
                                >
                                    <h3>{task.title}</h3>
                                    <div className={style["task-info"]}>
                                        <p>
                                            <b>Due Date: </b>
                                            {
                                                formatDateAndTime(task.dueDate)
                                                    .date
                                            }
                                        </p>{" "}
                                        <p>
                                            <b>Priority: </b>
                                            {priorityObject[task.priority]}
                                        </p>
                                        <p>
                                            <b>Categories: </b>
                                            {task.categories
                                                ?.map((category) => category)
                                                .join(", ")}
                                        </p>
                                        <p>
                                            <b>Status: </b>
                                            {task.completed
                                                ? "Done"
                                                : "Pending..."}{" "}
                                            {overDueCheck(task.dueDate) && (
                                                <span>(Due Time Over)</span>
                                            )}
                                        </p>
                                    </div>
                                    <Link to="/task-details" state={{ task }}>
                                        View Details
                                    </Link>
                                </div>
                            ))}
                    </div>
                </>
            )}
            {!user && (
                <div className={style["not-logged-in"]}>
                    <h2>You are not logged in</h2>
                    <p>
                        <Link to="/login">Login</Link> or{" "}
                        <Link to="/register">Register</Link> to view your task
                        list
                    </p>
                </div>
            )}
        </div>
    );
}
