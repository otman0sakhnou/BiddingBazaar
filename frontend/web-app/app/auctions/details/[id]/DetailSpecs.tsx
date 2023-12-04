'use client';

import {Auction} from "@/types";
import {Table} from "flowbite-react";

type Props = {
  auction: Auction
}

export default function DetailSpecs({auction}: Props) {
  return (
    <Table striped={true} className="w-full border-collapse">
    <Table.Body className="divide-y">
        <Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-700 dark:text-white py-2 px-4">
                Seller
            </Table.Cell>
            <Table.Cell className="sm:truncate py-2 px-4">
                {auction.seller}
            </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-700 dark:text-white py-2 px-4">
                Make
            </Table.Cell>
            <Table.Cell className="sm:truncate py-2 px-4">
                {auction.make}
            </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-700 dark:text-white py-2 px-4">
                Model
            </Table.Cell>
            <Table.Cell className="sm:truncate py-2 px-4">
                {auction.model}
            </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-700 dark:text-white py-2 px-4">
                Year manufactured
            </Table.Cell>
            <Table.Cell className="sm:truncate py-2 px-4">
                {auction.year}
            </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-700 dark:text-white py-2 px-4">
                Mileage
            </Table.Cell>
            <Table.Cell className="sm:truncate py-2 px-4">
                {auction.mileage}
            </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-700 dark:text-white py-2 px-4">
                Has reserve price?
            </Table.Cell>
            <Table.Cell className="sm:truncate py-2 px-4">
                {auction.reservePrice > 0 ? 'Yes' : 'No'}
            </Table.Cell>
        </Table.Row>
    </Table.Body>
</Table>

  )
}
