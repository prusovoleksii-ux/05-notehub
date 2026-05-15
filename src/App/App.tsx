import {
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query'
import { useState } from 'react'
import './App.module.css'
import css from './App.module.css'
import { fetchNotes } from '../services/noteService'
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import { useDebouncedCallback } from 'use-debounce'
import SearchBox from '../SearchBox/SearchBox'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import LoadingMessage from '../LoadingMessage/LoadingMessage'
import Error from '../Error/Error'

export default function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSetQuery = useDebouncedCallback((search: string) => setQuery(search), 300);
  
  const {data, isSuccess, isFetching, isError} = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 0;

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isFetching && <LoadingMessage />}
      {isError && <Error />}
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearchChange={debouncedSetQuery}/>
          {isSuccess && totalPages > 1 && 
            <Pagination
              totalPages={totalPages}
              page={currentPage}
              setPage={setCurrentPage}
            />
          }
          <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
        </header>
        {data && data.notes.length > 0 && 
          <NoteList notes={data.notes} />
        }
        {isModalOpen &&
          <Modal>
            <NoteForm onClose={closeModal}/>
          </Modal>}
      </div>
    </>
  )
}

