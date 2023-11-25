// Importing necessary modules and components
import React, {useEffect} from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import TargetForm from './TargetForm';
import TargetItems from '../TargetItems/TargetItems';

function Target() {
    // Accessing functions and states from global context using useGlobalContext hook
    const {addTarget, getTarget, deleteTarget, target} = useGlobalContext()

    // useEffect hook to fetch incomes on component mount
    useEffect(() =>{
        getTarget()
    }, [])



    return (
        <TargetStyled>
            <InnerLayout>
                <h1>Target</h1>
                <div className='target-content'>
                    <div className='form-container'>
                        {/* Form component to add new target */}
                        <TargetForm />


                    </div>
                    <div className="target">

                        {/* Mapping through incomes to display each income */}
                        {target.map((target) => {
                            const {_id, title, amount, date, category, description, type} = target;
                            return ( 
                                // TargetItem component to display individual income items
                            <TargetItems
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                type = {type}
                                date={date}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteTarget}
                            />
                            );
                        })}

                    </div>
                </div>



            </InnerLayout>
        </TargetStyled>

    )
}
const TargetStyled = styled.div`
    display: flex;
    overflow: auto;
    .target-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;

        }
    }
`;

export default Target
