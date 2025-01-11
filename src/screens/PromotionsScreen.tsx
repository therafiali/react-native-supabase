import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '../components/ScreenWrapper';
import { supabase } from '../lib/supabase';

type Promotion = {
  id: number;
  title: string;
  description: string;
  amount: number;
  promo_code: string;
  status: string;
  end_date: string;
};

type RootStackParamList = {
  MainTabs: { screen: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const PromotionsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .eq('status', 'active')
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPromotions(data || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPromotion = ({ item }: { item: Promotion }) => (
    <View style={styles.promoCard}>
      <View style={styles.promoHeader}>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoAmount}>${item.amount}</Text>
      </View>
      <Text style={styles.promoDescription}>{item.description}</Text>
      <View style={styles.promoFooter}>
        <Text style={styles.promoCode}>Code: {item.promo_code}</Text>
        <Text style={styles.promoExpiry}>
          Expires: {new Date(item.end_date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Promotions</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : promotions.length > 0 ? (
          <FlatList
            data={promotions}
            renderItem={renderPromotion}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active promotions available</Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  promoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  promoAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00C853',
  },
  promoDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  promoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoCode: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  promoExpiry: {
    fontSize: 12,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PromotionsScreen; 