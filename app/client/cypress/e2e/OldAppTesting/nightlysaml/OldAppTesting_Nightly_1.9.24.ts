// <reference types="Cypress" />

import {
    agHelper,
    deployMode,
    entityExplorer,
    locators,
    table,
} from "../../../../support/Objects/ObjectsCore";

describe("OldAppTesting_Nightly_1.9.24", { tags: ["@tag.JS"] }, () => {
    before(() => {
        // Navigate to the test application
        cy.visit(
            "https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/oauth20-65b0af0b54733a264591f96b",
        );
    });

    it("1. Verify OAuth2.0 table is loaded and contains data", () => {
         // Wait for table to load and Verify table exists and is visible
         table.WaitUntilTableLoad(0, 0, "v2");
         agHelper.GetNClick(locators._tableWidget, 0, true);
         agHelper.AssertElementVisibility(locators._tableWidget);
         agHelper.AssertContains("folder");
        
         // Verify first row data and verify table headers exist
         table.ReadTableRowColumnData(0, 0, "v2").then((cellData) => {
             expect(cellData).to.not.be.empty;
         });
         table.AssertTableLoaded;
         table.AssertTableHeaderOrder;
        
         // Check if pagination exists
        agHelper.GetElement("body").then(($body) => {
         if ($body.find(table._listNextPage).length > 0) {
             // Verify next page functionality
             table.NavigateToNextPage();
             // Wait for table to load
             table.WaitUntilTableLoad();
             // Verify data loads in next page
             table.ReadTableRowColumnData(0, 0, "v2").then((cellData) => {
             expect(cellData).to.not.be.empty;
             });
         }
         });
    });

    it("2. Verify Firestore page widgets and data", () => {
        // Navigate to the Firestore page
        //cy.visit("https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/firestore-65b0af0b54733a264591f96a");
        cy.get(locators._deployedPage).contains("Firestore").click({force: true});

        // Wait for table to load and verify it exists
        table.WaitUntilTableLoad(0, 0, "v2");
        
        // Verify table is visible
        agHelper.AssertElementVisibility(locators._widgetInDeployed("tablewidgetv2"));
        
        // Search for 'Amele New' in table and verify
        table.SearchTable("Amele New");
        table.ReadTableRowColumnData(0, 2, "v2").then((cellData) => {
        expect(cellData.toLowerCase()).to.contain("amele new");
        });
        
        // Verify presence of button widget
        agHelper.AssertElementVisibility(locators._widgetInDeployed("buttonwidget"));
        
        // Verify presence of text widget
        agHelper.AssertElementVisibility(locators._widgetInDeployed("textwidget"));
        
        // Verify presence of select widget
        agHelper.AssertElementVisibility(locators._widgetInDeployed("selectwidget"));
        
        // Verify presence of input widget
        agHelper.AssertElementVisibility(locators._widgetInDeployed("inputwidgetv2"));
    });

    it("3. Verify PostgreSQL tab table and widgets", () => {
        // Navigate to the PostgreSQL tab
        //cy.visit("https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/postgresql-65b0af0b54733a264591f972");
        cy.get(locators._deployedPage).contains("PostGreSQL").click({force: true});

        // Wait for table to load and verify it exists
        table.WaitUntilTableLoad(0, 0, "v2");
        
        // Verify table is visible
        agHelper.AssertElementVisibility(locators._widgetInDeployed("tablewidgetv2"));
        
        // Verify specific email in 8th column (index 7)
        table.SearchTable("kri@gmail.com");
        table.ReadTableRowColumnData(0, 7, "v2").then((cellData) => {
            expect(cellData).to.contain("kri@gmail.com");
        });
        
        // Verify presence of button widgets
        agHelper.AssertElementVisibility(locators._widgetInDeployed("buttonwidget"));
        
        // Verify presence of input widget
        agHelper.AssertElementVisibility(locators._widgetInDeployed("inputwidgetv2"));
        
        // Verify presence of select widget
        agHelper.AssertElementVisibility(locators._widgetInDeployed("selectwidget"));
    });


    it("4. Verify MongoDB tab table and widgets", () => {
        // Navigate to the MongoDB tab
        //cy.visit("https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/mongo-65b0af0b54733a264591f96f");
        cy.get(locators._deployedPage).contains("Mongo").click({force: true});

        // Wait for table to load and verify it exists
        table.WaitUntilTableLoad(0, 0, "v2");
        
        // Verify table is visible
        agHelper.AssertElementVisibility(locators._widgetInDeployed("tablewidgetv2"));
        
        // Read and verify 'movies' text in 5th column (index 4)
        table.SearchTable("movies");
        table.ReadTableRowColumnData(0, 4, "v2").then((cellData) => {
            expect(cellData.toLowerCase()).to.contain("movies");
        });
        
        // Verify presence of button widgets
        agHelper.AssertElementVisibility(locators._widgetInDeployed("buttonwidget"));
    });

    it("5. Verify Oracle tab widgets and text content", () => {
        // Navigate to the Oracle tab
        //cy.visit("https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/oracle-65b0af0b54733a264591f968");
        cy.get(locators._deployedPage).contains("Oracle").click({force: true});

        // Verify text widgets are present and verify specific text
        agHelper.AssertElementVisibility(locators._widgetInDeployed("textwidget"));
        agHelper.GetNAssertContains(locators._widgetInDeployed("textwidget"), "Enter Values");
        
        // Verify input widget is present
        agHelper.AssertElementVisibility(locators._widgetInDeployed("inputwidgetv2"));
        
        // Verify button widget is present
        agHelper.AssertElementVisibility(locators._widgetInDeployed("buttonwidget"));
    });

    it("6. Verify S3 tab table and content", () => {
        // Navigate to the S3 tab
        //cy.visit("https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/s3-65b0af0b54733a264591f967");
        cy.get(locators._deployedPage).contains("S3").click({force: true});

        // Wait for table to load and verify it exists
        table.WaitUntilTableLoad(0, 0, "v2");
        
        // Verify table is visible
        agHelper.AssertElementVisibility(locators._widgetInDeployed("tablewidgetv2"));
        
        // Search for 'MyFile1.txt' in table and verify
        table.SearchTable("MyFile1.txt");
        table.ReadTableRowColumnData(0, 0, "v2").then((cellData) => {
            expect(cellData).to.contain("MyFile1.txt");
        });
    });

    it("7. Verify Snowflake tab table and form widgets", () => {
        // Navigate to the Snowflake tab
        //cy.visit("https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/snowflake-65b0af0c54733a264591f976");
        cy.get(locators._deployedPage).contains("Snowflake").click({force: true});

       
        // Verify container widget is visible
         agHelper.AssertElementVisibility(locators._widgetInDeployed("containerwidget"));
        
         // Verify text "Rachna Dixit" is present in the container
         agHelper.GetNAssertContains(locators._widgetInDeployed("containerwidget"), "Rachna Dixit");
       
        
        // Verify form heading text
        agHelper.AssertElementVisibility(locators._widgetInDeployed("jsonformwidget"));
        agHelper.GetNAssertContains(locators._widgetInDeployed("jsonformwidget"), "Update Row");
        
    });

    it("8. Verify Dynamo tab text widget content", () => {
        // Navigate to the Dynamo tab
        //cy.visit("https://nightly-saml-alb-https.appsmith.com/app/oldapp-dstesting1-9-24/dynamo-662f8b3a185e4e66751e4526");
        cy.get(locators._deployedPage).contains("Dynamo").click({force: true});

        // Verify text widget is present and visible
        agHelper.AssertElementVisibility(locators._widgetInDeployed("textwidget"));
        
        // Verify text widget contains specific text
        agHelper.GetNAssertContains(locators._widgetInDeployed("textwidget"), '"TableName": "test-appsmith"');
    });


});
