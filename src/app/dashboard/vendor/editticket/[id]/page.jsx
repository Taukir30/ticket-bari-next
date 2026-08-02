import EditTicketForm from '@/components/Dashboard/EditTicketForm';
import React from 'react';

const EditTicketPage = async ({ params }) => {

    const { id } = await params;   

    

    return <EditTicketForm id={id} />;
};

export default EditTicketPage;