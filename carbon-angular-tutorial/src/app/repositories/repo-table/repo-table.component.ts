

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import {TableModel,	TableItem,	TableHeaderItem, Table} from 'carbon-components-angular';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
	selector: 'app-repo-table',
	templateUrl: './repo-table.component.html',
	styleUrls: ['./repo-table.component.scss']
})
export class RepoTableComponent implements OnInit {
	model = new TableModel();
	skeletonModel = Table.skeletonModel(10, 6);
	skeleton = true;
	data = [];
	options = {
		data: [
			{label: "option1", value: "Option1"},
			{label: "option2", value: "Option2"},
			{label: "option3", value: "Option3"},
			{label: "option4", value: "Option4"}
		]
	}

	@ViewChild('linkTemplate') linkTemplate: TemplateRef<any>;
	@ViewChild("overflowMenuItemTemplate") overflowMenuItemTemplate: TemplateRef<any>;

	constructor(private apollo: Apollo) { }

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({ data: 'Name' }),
			new TableHeaderItem({ data: 'Created' }),
			new TableHeaderItem({ data: 'Updated' }),
			new TableHeaderItem({ data: 'Open Issues' }),
			new TableHeaderItem({ data: 'Stars' }),
			new TableHeaderItem({ data: 'Links' })
		];
		this.model.pageLength = 10;
		this.apollo.watchQuery({
			query: gql`
				query REPO_QUERY {
					# Let's use carbon as our organization
					organization(login: "carbon-design-system") {
						# We'll grab all the repositories in one go. To load more resources
						# continuously, see the advanced topics.
						repositories(first: 75, orderBy: { field: UPDATED_AT, direction: DESC }) {
							totalCount
							nodes {
								url
								homepageUrl
								issues(filterBy: { states: OPEN }) {
									totalCount
								}
								stargazers {
									totalCount
								}
								releases(first: 1) {
									totalCount
									nodes {
										name
									}
								}
								name
								updatedAt
								createdAt
								description
								id
							}
						}
					}
				}
			`
		})
			.valueChanges.subscribe((response: any) => {
				if (response.error) {
					const errorData = [];
					errorData.push([
						new TableItem({ data: 'error!' })
					]);
					this.model.data = errorData;
				} else if (response.loading) {
					this.skeleton = true;
				} else {

					this.data = response.data.organization.repositories.nodes;
					console.log('Apollo nodes; ', this.data);
					this.model.pageLength = 10;
					this.model.totalDataLength = response.data.organization.repositories.totalCount;
					this.selectPage(1);
				}
			});
	}

	selectPage(page) {
		console.log (page)
		const offset = this.model.pageLength * (page - 1);
		const pageRawData = this.data.slice(offset, offset + this.model.pageLength);
		this.model.data = this.prepareData(pageRawData);
		this.model.header = [
			new TableHeaderItem({ data: "Name" }),
			new TableHeaderItem({ data: "Created" }),
			new TableHeaderItem({ data: "Updated" }),
			new TableHeaderItem({ data: "Issues" }),
			new TableHeaderItem({ data: "Stars" }),
			new TableHeaderItem({ data: "Link" }),
			new TableHeaderItem({ data: "Actions" }),
		];
		this.model.currentPage = page;
	}

	prepareData(data:any) {
		const newData = [];
		this.skeleton = false;

		data.forEach((datum, index:number) => {
			newData.push([
				new TableItem({ data: datum.name, expandedData: datum.description }),
				new TableItem({ data: new Date(datum.createdAt).toLocaleDateString() }),
				new TableItem({ data: new Date(datum.updatedAt).toLocaleDateString() }),
				new TableItem({ data: datum.issues.totalCount }),
				new TableItem({ data: datum.stargazers.totalCount }),
				new TableItem({
					data: {
						github: datum.url,
						homepage: datum.homepageUrl
					},
					template: this.linkTemplate
				}),
				new TableItem({
					data: {"Action": ''},
					template: this.overflowMenuItemTemplate
				}),
				
			])

		})
		return newData;
	}

	onRowClick(index: number) {
		console.log("Row item selected:", index);
	}

	onSelectRow($event){
		console.log ("onSelect", $event)
	}

	actionSelected(value){
		console.log ("action-event: ", value)
	}
}