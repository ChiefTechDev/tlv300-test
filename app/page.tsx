'use client'
import {Input} from "@nextui-org/react";
import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid'
import {Card, CardBody} from "@nextui-org/react";
import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import TablePanel from '@/components/table-panel'
import {Spinner} from "@nextui-org/spinner";

export default function Home() {
  const [searchKey, setSearchKey] = useState<string>('');
  const [data, setData] = useState<object | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log('Data -->', data)
  }, [data])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!searchKey) {
      alert('Please input domain');
      return;
    }
    setLoading(true)
    fetch(`/api/whois?domainName=${searchKey}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      });
  }
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Input
        variant="bordered"
        placeholder="Enter your Search doamin"
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchKey(e.target.value)}
        endContent={
          <button className="focus:outline-none" type="button" onClick={() => handleSearch()}>
            <MagnifyingGlassIcon className="size-6 text-default-400 pointer-events-none" />
          </button>
        }
        type='text'
        className="max-w-xs"
      />
      {!error && data && !data?.ErrorMessage?
        <TablePanel WhoisRecord={data} />:
        <></>
      }
      {!error && data?.ErrorMessage &&
        <Card
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        >
          <CardBody>
            <p>{data?.ErrorMessage.msg}</p>
          </CardBody>
        </Card>
      }
      {
        loading && <Spinner />
      }
    </section>
  );
}
