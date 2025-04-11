
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TableInfo {
  name: string;
  schema: string;
  rowCount?: number;
}

export default function DatabaseInfo() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTables = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get the list of tables we want to show
      const tablesToShow = [
        { name: 'profiles', schema: 'public' },
        { name: 'chatbots', schema: 'public' },
        { name: 'chatbot_knowledge', schema: 'public' },
        { name: 'video_summaries', schema: 'public' }
      ];
      
      const tablesInfo: TableInfo[] = [...tablesToShow];
      
      // Get row counts for each table
      for (const table of tablesInfo) {
        if (table.schema === 'public') {
          const { count, error: countError } = await supabase
            .from(table.name)
            .select('*', { count: 'exact', head: true });
          
          if (!countError) {
            table.rowCount = count;
          } else {
            console.error(`Error fetching count for ${table.name}:`, countError);
          }
        }
      }
      
      setTables(tablesInfo);
    } catch (err) {
      console.error('Error fetching tables:', err);
      setError(typeof err === 'object' && err !== null && 'message' in err 
        ? String(err.message) 
        : 'Failed to fetch database tables');
      toast.error('Failed to fetch database tables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <Card className="bg-[#16213e] border-0 shadow-lg text-white max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Database Tables</CardTitle>
        <CardDescription className="text-gray-300 text-center">
          View all tables in the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={fetchTables} variant="outline">Try Again</Button>
          </div>
        ) : (
          <>
            <Button onClick={fetchTables} className="mb-4 bg-[#0f3460] hover:bg-[#0f3460]/80">
              Refresh Tables
            </Button>
            <Table>
              <TableCaption>List of all database tables</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Schema</TableHead>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Row Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tables.length > 0 ? (
                  tables.map((table, index) => (
                    <TableRow key={index}>
                      <TableCell>{table.schema}</TableCell>
                      <TableCell>{table.name}</TableCell>
                      <TableCell>{table.rowCount !== undefined ? table.rowCount : 'N/A'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No tables found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
