'use client';

import { useState } from 'react';

import { type Addresses } from '~/lib/fetchers/addresses';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { Separator } from '~/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

import { AddAddressForm } from './add-address-form';

type ManageAdressesProps = {
  addresses: Addresses;
};

export default function ManageAdresses({ addresses }: ManageAdressesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className='overflow-x-auto'>
        <CardHeader>
          <CardTitle>
            <div className='flex items-center justify-between'>
              <h2>Manage Addresses</h2>
              <Button size='sm' onClick={() => setIsModalOpen(true)}>
                Add Address
              </Button>
            </div>
            <Separator className='mt-2.5' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {addresses.length === 0 ? (
            <p>No addresses found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Postal Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.map(address => (
                  <TableRow key={address.id}>
                    <TableCell>{address.address}</TableCell>
                    <TableCell>{address.state}</TableCell>
                    <TableCell>{address.city}</TableCell>
                    <TableCell>{address.phone}</TableCell>
                    <TableCell>{address.postalCode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
          </DialogHeader>
          <AddAddressForm onSuccess={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
