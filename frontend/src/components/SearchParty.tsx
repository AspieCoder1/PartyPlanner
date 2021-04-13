import styles from './SearchParty.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../redux/store';
import React, {useState, useEffect} from 'react';
import {getParties, publicParties} from '../redux/party-slice';

type IProps = {
    closeModal: () => void;
};

export const SearchParty = (props: IProps): JSX.Element => {
    const parties = useSelector((state: Store) => state.parties.parties);
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState<string>('');

    // when something is typed, or when button is pressed, it will update search
    const updateSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {setSearchInput(e.target.value);};
    const search = (e: React.ChangeEvent<HTMLButtonElement>) => {setSearchInput(e.target.value);};


    // NEEDS TO BE LINKED UP TO DB
    const joinParty = (e: React.MouseEvent<HTMLDivElement>) => {props.closeModal();};

    // get data from DB
    useEffect(() => {
        dispatch(publicParties(searchInput));
    }, []);


    return (
        <div>
            <div className={styles.header}>
                <h1>Search Parties</h1>
                <button className={styles.closeButton} onClick={props.closeModal}>
                    &times;
                </button>
            </div>
            <div className={styles.main}>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search parties"
                    onChange={updateSearchInput}
                />
                <button className={styles.buttonSubmit} type="submit" onSubmit={search}>Search</button>
                <br/><br/>
                <div className={styles.flexContainer}>
                    {/*Example parties to be deleted once it works*/}
                    <div className={styles.party} onClick={joinParty}>
                        <div className={styles.title}>CompSci Party</div>
                        <div className={styles.date}>15:00 20/04/2021</div>
                        <div className={styles.description}>A party for First Year CompSci students only</div>

                    </div>
                    <div className={styles.party} onClick={joinParty}>
                        <div className={styles.title}>CompSci Party</div>
                        <div className={styles.date}>15:00 20/04/2021</div>
                        <div className={styles.description}>A party for First Year CompSci students only</div>
                    </div>
                    <div className={styles.party} onClick={joinParty}>
                        <div className={styles.title}>CompSci Party</div>
                        <div className={styles.date}>15:00 20/04/2021</div>
                        <div className={styles.description}>A party for First Year CompSci students only</div>
                    </div>

                    {/*Mapping parties out*/}
                    {parties.map((party: any) => <div className={styles.party}  onClick={joinParty} key={party._id}>
                        <div className={styles.title}>CompSci Party</div>
                        <div className={styles.date}>15:00 20/04/2021</div>
                        <div className={styles.description}>party._id</div>
                    </div>)}
                </div>
                <p className={styles.center}>No more parties available</p>
            </div>
        </div>

    );
};

