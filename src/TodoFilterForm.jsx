export function TodoFilterForm({filterState}){
    const {filterName, setFilterName, hideCompletedTodos, setHideCompletedTodos} = filterState
    return (
        <div className="filter-form">
            <div className="filter-form-group">
                <label htmlFor="name">Search Todo:(Name)</label>
                <input 
                    type="text" 
                    id="name" 
                    value={filterName} 
                    onChange={e => setFilterName(e.target.value)}
                />
            </div>
            <label>
                <input 
                    type="checkbox" 
                    checked={hideCompletedTodos}
                    onChange={e => setHideCompletedTodos(e.target.checked)}
                />
                Hide Completed
            </label>
        </div>
    )
}