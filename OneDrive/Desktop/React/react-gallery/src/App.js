import React, { useEffect, useState } from 'react';
import Collection from './Collection';
import './Gallery.scss';

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
];

function App() {
    const [page, setPage] = useState(1);
    const [categoryId, setCategoryId] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        const category = categoryId ? `category=${categoryId}` : '';
        fetch(`https://64f05e768a8b66ecf77988dd.mockapi.io/api/gallery/photo_collections?page=${page}&limit=2&${category}`)
            .then((response) => response.json())
            .then((json) => setCollections(json))
            .catch(err => {
                console.warn(err);
                alert('Ошибка при получении пользователей')
            }).finally(() => setIsLoading(false))
    }, [categoryId, page])
    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {cats.map((obj, i) =>
                        <li
                            onClick={() => setCategoryId(i)}
                            className={categoryId === i ? 'active' : ''}
                            key={obj.name}>{obj.name}</li>)}
                </ul>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
            </div>
            <div className="content">
                {isLoading ? <h2>Идет загрузка...</h2>
                    : (collections.filter(obj => {
                        return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
                    }).map((obj, index) => (
                        <Collection
                            key={index}
                            name={obj.name}
                            images={obj.photos}
                        />
                    )))
                }

            </div>
            <ul className="pagination">
                {[...Array(4)].map((_, i) => <li onClick={() => setPage(i + 1)} className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>)}
            </ul>
        </div>
    );
}

export default App;