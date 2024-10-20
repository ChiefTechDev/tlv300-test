'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
// import {WhoisRecord} from '@/app/api/whois/sample.json'

export default function App({WhoisRecord}) {
	const hostNames = WhoisRecord?.nameServers.hostNames.join(', ');

	return (
		<>
			<h1>Domain Information</h1>
			<Table aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>Domain Name</TableColumn>
					<TableColumn>Registrar</TableColumn>
					<TableColumn>Registration Date</TableColumn>
					<TableColumn>Expiration Date</TableColumn>
					<TableColumn>Estimated Domain Age</TableColumn>
					<TableColumn>Hostnames</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key="1">
						<TableCell>{WhoisRecord?.domainName}</TableCell>
						<TableCell>{WhoisRecord?.registrarName}</TableCell>
						<TableCell>{WhoisRecord?.createdDateNormalized}</TableCell>
						<TableCell>{WhoisRecord?.expiresDateNormalized}</TableCell>
						<TableCell>{WhoisRecord?.estimatedDomainAge}</TableCell>
						<TableCell>{hostNames.length > 25 ? hostNames.substring(0, 25) + '...' : hostNames}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<h1>Contact Information</h1>
			<Table aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>Registrant Name</TableColumn>
					<TableColumn>Technical Contact Name</TableColumn>
					<TableColumn>Administrative Contact Name</TableColumn>
					<TableColumn>Contact Email</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key="1">
						<TableCell>{WhoisRecord?.registrarName}</TableCell>
						<TableCell>{WhoisRecord?.technicalContact.name}</TableCell>
						<TableCell>{WhoisRecord?.administrativeContact.name}</TableCell>
						<TableCell>{WhoisRecord?.contactEmail}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	);
}