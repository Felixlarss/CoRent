import { getHouseById } from '$lib/services/houseApi';
import { getMembers, getMemberData } from '$lib/services/memberApi';
import type { HouseRow, MemberRow } from '$lib/types';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export async function houseDataToPdf() {
	console.log('Starting PDF generation...');
	try {
		const member: MemberRow = await getMemberData();
		if (!member) {
			console.error('PDF generation failed: Could not get member data.');
			return;
		}

		const members: MemberRow[] = await getMembers();
		const house: HouseRow = await getHouseById(member.house_id);

		if (house && members) {
			console.log('Data fetched, creating PDF...');
			const doc = new jsPDF();
			doc.setFont('times', 'normal');
			doc.text(`House Name: ${house.house_name}`, 15, 10);
			doc.text(`Rent: ${house.house_rent} Kr`, 15, 20);
			doc.text(`Area: ${house.house_m2} m²`, 15, 30);

			const memberData = members.map((m) => [
				m.member_name,
				`${m.member_rent} Kr`,
				`${m.member_m2} m²`
			]);

			autoTable(doc, {
				styles: { font: 'times' },
				head: [['Name', 'Rent', 'Area']],
				body: memberData,
				startY: 40
			});

			console.log('Triggering PDF download...');
			doc.save(`${house.house_name}.pdf`);
			console.log('PDF download triggered.');
		} else {
			console.error('PDF generation failed: Missing house or members data.', { house, members });
		}
	} catch (error) {
		console.error('An error occurred during PDF generation:', error);
	}
}
