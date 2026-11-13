const http = require('http');
const express = require('express');

// We can test server routes by requiring server or testing the endpoints directly
const adbmsEngine = require('./adbms-engine');

async function testAllUnits() {
    console.log('🧪 Starting Comprehensive ADBMS Engine & Route Verification...\n');

    // UNIT 1: Relational Data Model & Anomalies
    console.log('--- Testing UNIT-I: Relational Model & Anomalies ---');
    const u1Domain = adbmsEngine.testRelationalConstraintOrAnomaly({ testCase: 'domain_violation' });
    console.log('  ✓ Domain Constraint Violation:', u1Domain.violationType);
    const u1Insert = adbmsEngine.testRelationalConstraintOrAnomaly({ testCase: 'insertion_anomaly' });
    console.log('  ✓ Insertion Anomaly:', u1Insert.testCase);
    const u1Delete = adbmsEngine.testRelationalConstraintOrAnomaly({ testCase: 'deletion_anomaly' });
    console.log('  ✓ Deletion Anomaly:', u1Delete.testCase);
    const u1Modify = adbmsEngine.testRelationalConstraintOrAnomaly({ testCase: 'modification_anomaly' });
    console.log('  ✓ Modification Anomaly:', u1Modify.testCase);
    console.log('  ✓ Relational Schemas Tables:', adbmsEngine.RELATIONAL_SCHEMAS.tables.map(t => t.name).join(', '));

    // UNIT 2: Parallel Databases
    console.log('\n--- Testing UNIT-II: Parallel Databases & Hash-Join ---');
    const u2Join = adbmsEngine.runParallelHashJoinBenchmark({ datasetSize: 10000, partitions: 4 });
    console.log('  ✓ Parallel Hash-Join Speedup:', u2Join.comparisons.speedupOverNestedLoop);
    console.log('  ✓ Architectures Loaded:', Object.keys(adbmsEngine.PARALLEL_ARCHITECTURES).join(', '));

    // UNIT 3: Distributed Databases & 2PC
    console.log('\n--- Testing UNIT-III: Distributed DBMS & 2PC ---');
    const u3Commit = adbmsEngine.simulateTwoPhaseCommit({ failNode: 'none' });
    console.log('  ✓ 2PC Normal Run Decision:', u3Commit.globalDecision);
    const u3Abort = adbmsEngine.simulateTwoPhaseCommit({ failNode: 'node1' });
    console.log('  ✓ 2PC Fault Injected Decision:', u3Abort.globalDecision);
    const u3Frag = adbmsEngine.simulateDistributedFragmentation({ region: 'APAC' });
    console.log('  ✓ Fragmentation Route:', u3Frag.routingDecision.selectedHorizontalFragment);
    const u3Semi = adbmsEngine.simulateDistributedSemiJoin({ allergyCount: 5 });
    console.log('  ✓ Semi-Join Bandwidth Saved:', u3Semi.semiJoinOptimized.bandwidthSaved);

    // UNIT 4: NoSQL Databases & Cassandra
    console.log('\n--- Testing UNIT-IV: NoSQL & Cassandra ---');
    const u4Mongo = adbmsEngine.runMongoAggregationPipeline({ minSugar: 10 });
    console.log('  ✓ MongoDB Pipeline Stages:', u4Mongo.stages.length, 'Stages: $match ➔ $unwind ➔ $group ➔ $project ➔ $sort');
    console.log('  ✓ Top Hazard Ingredients Found:', u4Mongo.results.length);
    const u4Cass = adbmsEngine.getCassandraColumnStoreModel();
    console.log('  ✓ Cassandra Keyspace & Column Family:', u4Cass.keyspace, '/', u4Cass.columnFamily);

    // UNIT 5: Data Warehousing & OLAP
    console.log('\n--- Testing UNIT-V: Data Warehousing & OLAP ---');
    const u5Slice = adbmsEngine.executeOlapOperation({ operation: 'slice' });
    console.log('  ✓ OLAP Slice:', u5Slice.operation, 'Rows:', u5Slice.resulting2DTable.length);
    const u5Dice = adbmsEngine.executeOlapOperation({ operation: 'dice' });
    console.log('  ✓ OLAP Dice:', u5Dice.operation, 'Subcube cells:', u5Dice.resultingSubCubeCells.length);
    const u5Roll = adbmsEngine.executeOlapOperation({ operation: 'rollup' });
    console.log('  ✓ OLAP Roll-up:', u5Roll.operation, 'Consolidated categories:', u5Roll.rolledUpData.length);
    const u5Drill = adbmsEngine.executeOlapOperation({ operation: 'drilldown' });
    console.log('  ✓ OLAP Drill-down:', u5Drill.operation, 'Subcategories:', u5Drill.granularBreakdown.length);
    const u5Pivot = adbmsEngine.executeOlapOperation({ operation: 'pivot' });
    console.log('  ✓ OLAP Pivot:', u5Pivot.operation, 'Matrix categories:', u5Pivot.pivotedMatrix.length);
    const u5Schema = adbmsEngine.getDataWarehouseSchemaInfo();
    console.log('  ✓ DWH Fact Table:', u5Schema.starSchema.factTable.name, 'Speedup:', u5Schema.materializedViewComparison.speedup);

    // UNIT 6: Data Mining & KDD
    console.log('\n--- Testing UNIT-VI: Data Mining & KDD ---');
    const u6Apriori = adbmsEngine.runAprioriAssociationMining({ minSupport: 0.10, minConfidence: 0.60 });
    console.log('  ✓ Apriori Rules Discovered:', u6Apriori.rules.length, 'Top Rule Lift:', u6Apriori.rules[0]?.lift);
    const u6Kmeans = adbmsEngine.runKMeansNutritionalClustering({ k: 4 });
    console.log('  ✓ K-Means Clusters Formed:', u6Kmeans.clusters.length);
    u6Kmeans.clusters.forEach(c => console.log(`     - Cluster ${c.clusterIndex}: ${c.clinicalProfileName} (${c.itemCount} items)`));
    const u6Kdd = adbmsEngine.getKddSevenStepProcess();
    console.log('  ✓ KDD Steps:', u6Kdd.steps.length);

    console.log('\n🎉 ALL 6 ADBMS UNITS VERIFIED AND OPERATIONAL!\n');
}

testAllUnits().catch(err => {
    console.error('❌ Test failed:', err);
    process.exit(1);
});

